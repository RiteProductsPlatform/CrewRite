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

  class TR_searchUpdateAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const validateGroup = await $application.functions.validateGroup();
      if (validateGroup ==='valid') {
        const timeValidator = await $application.functions.timeValidator($variables.SearchRowdata);

        if (timeValidator.isValid) {
          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/putUpdateheaderSet',
            uriParams: {
              'crewsetup_id': $variables.SearchRowdata.crewsetup_id,
              'crewsetup_line_id': $variables.SearchRowdata.crewsetup_line_id,
              'time_entry_id': $variables.SearchRowdata.time_entry_id,
            },
            body: $variables.SearchRowdata,
          });

          if (response.ok) {
            await Actions.fireNotificationEvent(context, {
              summary: 'TimeSheet updated Successfully',
              type: 'confirmation',
              displayMode: 'transient',
            });

            const timesDialogClose = await Actions.callComponentMethod(context, {
              selector: '#timesDialog',
              method: 'close',
            });

            await Actions.resetVariables(context, {
              variables: [
    '$variables.SearchRowdata',
  ],
            });

            await Actions.callChain(context, {
              chain: 'TR_fetchSearchSheetData_New',
            });
           
          }
          else{
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed to Update Timesheet',
              type: 'error',
              displayMode: 'transient',
            });
            
          }



          
        }


      }
    }
  }

  return TR_searchUpdateAction_New;
});
