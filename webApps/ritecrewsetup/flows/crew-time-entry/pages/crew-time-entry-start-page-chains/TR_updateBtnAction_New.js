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

  class TR_updateBtnAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const validateGroup = await $application.functions.validateGroup('updateformvalidation');

      if (validateGroup === 'valid') {
        const timeValidator = await $application.functions.timeValidator($variables.updateTimeSheet);

        if (timeValidator.isValid) {
          const response = await Actions.callRest(context, {
            endpoint: 'CrewRite_ORDS/putCrewRite_TimeEntryAdd',
            body: $variables.AddRowData,
          });

          // const response = await Actions.callRest(context, {
          //   endpoint: 'TimeRite_Ords_Service/UpdatetimeSheetTime',
          //   body: $variables.SearchRowdata,
          // });

          
          if(response.ok){
          const timesDialogClose = await Actions.callComponentMethod(context, {
            selector: '#timesDialog',
            method: 'close',
          });

          await Actions.callChain(context, {
            chain: 'TR_FetchTimeSheetData_New',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'TimeSheet Updated Successfully',
            displayMode: 'transient',
            type: 'confirmation',
          });
           await Actions.resetVariables(context, {
            variables: [
              '$variables.AddRowData',
            ],
          });
          }
          else{
  await Actions.fireNotificationEvent(context, {
    summary: 'Failed to Update TimeSheet',
    type: 'error',
    displayMode: 'transient',
  });
          }

         
        }
        else {
          await Actions.fireNotificationEvent(context, {
            summary: timeValidator.msg,
            type: 'error',
            displayMode: 'transient',
          });

        }

      }
    }
  }

  return TR_updateBtnAction_New;
});
