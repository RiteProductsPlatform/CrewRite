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

      const adpData = await $functions.getassignVaribales();

      $variables.CrewMeasureADP.data = adpData.crewMeasure.data;
      $variables.CrewScopeADP.data = adpData.crewscope.data;
      $variables.TimeEntrymethodADP.data = adpData.timeentry.data;
      $variables.WeekDaysADP.data = adpData.weekdays.data;
      $variables.CrewSpecificADP.data = adpData.crewspecific.data;
      $variables.CrewTypeLOVADP.data = adpData.crewttype.data;

      if ($page.variables.AssignEnabled) {
        await Actions.callChain(context, {
          chain: 'TR_FetchHeadersLines_New',
        });
        
      }
      
    }
  }

  return TR_fetchLOvs_New;
});
