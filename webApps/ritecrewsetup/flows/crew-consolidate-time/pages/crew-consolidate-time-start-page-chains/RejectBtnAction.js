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

  class RejectBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/GetTimeEntryId',
        uriParams: {
          'crew_date': $functions.dateFormatter($variables.SearchParams.start_date),
          'crew_week': '',
          'crewsetup_id': $variables.SearchParams.crew_setup_id,
        },
      });

      const results = await ActionUtils.forEach(response.body.items, async (item, index) => {

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/UpdateApproval',
          uriParams: {
            'time_entry_id': response.body.items[index].time_entry_id,
          },
        });
      }, { mode: 'serial' });

      const response3 = await Actions.callRest(context, {
        endpoint: 'icsEndpoint/postSUBMIT_TIMESHEETDB_UI1_0SubmitTimesheetUI',
      });

      if (!response3.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Approve the Timesheet',
          displayMode: 'transient',
        });
      
        return;
      } else {
        const response4 = await Actions.callRest(context, {
          endpoint: 'icsEndpoint/postTRCREWELEMENTENTRYV2_1_0InvokeElementEntry',
        });

        if (!response4.ok) {
        
          return;
        } else {
           await Actions.fireNotificationEvent(context, {
             summary: 'Timesheet Approved Successfully',
             displayMode: 'transient',
           });
        }
      }
    }
  }

  return RejectBtnAction;
});
