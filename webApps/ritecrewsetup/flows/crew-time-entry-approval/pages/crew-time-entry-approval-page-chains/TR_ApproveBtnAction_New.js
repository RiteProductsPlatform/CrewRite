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

  class TR_ApproveBtnAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      debugger;

      if ($page.variables.searchobj.specific === "DAY") {
        const dateFormatter = await $functions.dateFormatter(undefined, undefined, $page.variables.searchobj.crewdate);
           
      }
       const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/GetTimeEntryId',
          uriParams: {
            'crew_date': "",
            'crew_week': $variables.searchobj.dateRange?$variables.searchobj.dateRange:"",
            'crewsetup_id': $variables.searchobj.crewSetup_id,
          },
        });

        if (response.ok) {
          const results = await ActionUtils.forEach(response.body.items, async (item, index) => {

            const response2 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/UpdateApproval',
              uriParams: {
                'time_entry_id': item.time_entry_id,
              },
            });

            
          }, { mode: 'serial' });
        }

        const response3 = await Actions.callRest(context, {
          endpoint: 'icsEndpoint/postSUBMIT_TIMESHEETDB_UI1_0SubmitTimesheetUI',
        });

        if (response3.ok) {
          const response4 = await Actions.callRest(context, {
            endpoint: 'icsEndpoint/postTRCREWELEMENTENTRYV2_1_0InvokeElementEntry',
          });

          if (response4.ok) {
            await Actions.fireNotificationEvent(context, {
              summary: 'Approval initiated Successfully',
              displayMode: 'transient',
              type: 'confirmation',
            });
            
          }
        }
        else{
          await Actions.fireNotificationEvent(context, {
            summary: 'failed to initiate Approval',
            displayMode: 'transient',
            type: 'error',
          });
          
        }  
    }
  }

  return TR_ApproveBtnAction_New;
});
