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

  class SavebtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestTimeRiteOrdsServiceUpdatetimeSheetTimeResult = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/UpdatetimeSheetTime',
        body: $page.variables.updateTimeSheet,
      });

      if (callRestTimeRiteOrdsServiceUpdatetimeSheetTimeResult.ok) {

        await Actions.fireNotificationEvent(context, {
          summary: 'TimeSheet updated Successfully',
          type: 'confirmation',
          displayMode: 'transient',
        });

        await Actions.callChain(context, {
          id: 'FetchTimeSheetData',
        });

        const callComponentMethodEditDlgCloseResult = await Actions.callComponentMethod(context, {
          selector: '#EditDlg',
          method: 'close',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to update Time Sheet data',
          displayMode: 'transient',
        });
      }
    }
  }

  return SavebtnAction;
});
