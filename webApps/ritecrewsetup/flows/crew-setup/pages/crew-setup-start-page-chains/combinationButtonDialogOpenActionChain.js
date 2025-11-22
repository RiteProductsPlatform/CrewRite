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

  class combinationButtonDialogOpenActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_TimeEntryCombinations',
        uriParams: {
          'p_crewsetup_id': $variables.crewSetupHeaderObj.crewsetup_id,
        },
      });

      if (response.ok) {
        $variables.combinationAdp.data = response.body.items;
        
      }

      const combinationOpen = await Actions.callComponentMethod(context, {
        selector: '#combination',
        method: 'open',
      });
    }
  }

  return combinationButtonDialogOpenActionChain;
});
