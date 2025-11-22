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

  class TR_RejectBtnAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      let isSuccess= false;

      if ($page.variables.searchobj.specific === "DAY") {
        const dateFormatter = await $functions.dateFormatter(undefined, undefined, $variables.searchobj.crewdate);
        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/GetTimeEntryId',
          uriParams: {
            'crew_date': dateFormatter.crewDate ? dateFormatter.crewDate :"",
            'crew_week': $variables.searchobj.dateRange?$variables.searchobj.dateRange:"",
            'crewsetup_id': $variables.searchobj.crewSetup_id
          },
        });

        const results = await ActionUtils.forEach(response.body.items, async (item, index) => {

          const response2 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/UpdateRejected',
            uriParams: {
              'time_entry_id': item.time_entry_id,
            },
          });
          if(response2.ok){
            isSuccess = true;
          }

          
        }, { mode: 'serial' });
        if (isSuccess) {
          await Actions.fireNotificationEvent(context, {
            summary: 'TimeSheet Rejected Successfully',
            type: 'error',
            displayMode: 'transient',
          });
          
        }
      }
    }
  }

  return TR_RejectBtnAction_New;
});
