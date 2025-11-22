define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class TR_CreateLinesAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validate = await $application.functions.validateGroup('linesvalGroup');
      debugger;

      if (validate === 'valid') {
        const timeValidator = await $application.functions.timeValidator($variables.linesObj);
        if (timeValidator.isValid) {
          const createPostPayload = await $functions.createPostPayload($variables.linesObj, $variables.dialogueLabel, $variables.crewSetupHeaderObj, $application.user.email);

          const response = await Actions.callRest(context, {
            endpoint: 'CrewRite_ORDS/postCrewRite_CrewSetupLines',
            body: createPostPayload,
          });

          // const response = await Actions.callRest(context, {
          //   endpoint: 'TimeRite_Ords_Service/postGetCrewSetUpLines',
          //   body: createPostPayload,
          // });

          if (response.ok) {
            await Actions.fireNotificationEvent(context, {
              summary: 'Resource Added Successfully',
              displayMode: 'transient',
              type: 'confirmation',
            });

            const resourceDialogClose = await Actions.callComponentMethod(context, {
              selector: '#resourceDialog',
              method: 'close',
            });

            await Actions.resetVariables(context, {
              variables: [
    '$variables.linesObj',
  ],
            });

            await Actions.callChain(context, {
              chain: 'TR_FetchHeadersLines_New',
            });
           
          }
          else{
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed to Create resource',
              displayMode: 'persist',
              type: 'error',
            });

            
          }
          
        }
        else{
          await Actions.fireNotificationEvent(context, {
            summary: timeValidator.msg,
            displayMode: 'transient',
            type: 'error',
          });
          $variables.linesObj.active_flag = 'Y';
          $variables.linesObj.assignment_number = "E"+ $variables.linesObj.resource_number;
          $variables.linesObj.contract_id = $variables.crewSetupHeaderObj.contract_id;
          $variables.linesObj.created_by = $variables.dialogueLabel === "Edit" ? $variables.linesObj.created_by : $application.user.email;
          $variables.linesObj.creation_date = $page.variables.dialogueLabel === "Edit" ? $page.variables.linesObj.creation_date :$page.functions.dateFormatter().sysdate;
          $variables.linesObj.crewsetup_id =  $page.variables.crewSetupHeaderObj.crewsetup_id;
          $variables.linesObj.crewsetup_line_id =  $page.variables.dialogueLabel === "Edit" ? $page.variables.linesObj.crewsetup_line_id : null;
          $variables.linesObj.customer_id =  $variables.crewSetupHeaderObj.customer_id;
          $variables.linesObj.effective_end_date = $page.functions.dateFormatter().endDate;
          $variables.linesObj.effective_start_date =  $page.functions.dateFormatter().startDate;
          $variables.linesObj.endDate =$page.functions.dateFormatter().hend;
          $variables.linesObj.last_updated_by = $application.user.email;
          $variables.linesObj.last_updated_date = $page.functions.dateFormatter().sysdate;
          $variables.linesObj.po = "";
          $variables.linesObj.po_line = "";
          $variables.linesObj.resource_type='EMPLOYEE';
          $variables.linesObj.start_date = $page.functions.dateFormatter().hstart;
          $variables.linesObj.time_entry_mode ='CREATE';






        
        }
      }
    }
  }

  return TR_CreateLinesAction_New;
});
