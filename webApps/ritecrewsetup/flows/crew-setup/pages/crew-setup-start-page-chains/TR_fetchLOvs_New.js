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

  class TR_fetchLOvs_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getCrewAdminDetails',
      });
      const adpData = await $functions.getassignVaribales();
      $variables.CrewMeasureADP.data = adpData.crewMeasure.data;
      $variables.CrewScopeADP.data = adpData.crewscope.data;
      $variables.TimeEntrymethodADP.data = adpData.timeentry.data;
      $variables.WeekDaysADP.data = adpData.weekdays.data;
      $variables.CrewSpecificADP.data = adpData.crewspecific.data;
      $variables.CrewTypeLOVADP.data = adpData.crewttype.data;

      if (response.ok) {
        $variables.perdiemdata.bonusamount = response.body.items[0].bonus_amount_rate;
        $variables.perdiemdata.bonusrate = response.body.items[0].bonus_map_rate;
        $variables.perdiemdata.amount= response.body.items[0].per_dm_amount;
        $variables.perdiemdata.rate= response.body.items[0].per_dm_rate;
      } 
      if ($page.variables.AssignEnabled) {
        await Actions.callChain(context, {
          chain: 'TRFetchHeadersLines_New',
        });        
      }    
     
    }
  }

  return TR_fetchLOvs_New;
});
