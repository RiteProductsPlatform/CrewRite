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

  class fetchMaxWeekId_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/GetMaxWeekid',
        uriParams: {
          'crew_week': $variables.searchobj.dateRange,
          'crewsetup_id': $variables.searchobj.crewSetup_id,
        },
      });
      if(response.ok){
          $variables.maxweekid =  response.body.items[0].weekid === null || typeof response.body.items[0].weekid === "undefined" ? 1 : response.body.items[0].weekid;
      }
      
     
    }
  }

  return fetchMaxWeekId_New;
});
