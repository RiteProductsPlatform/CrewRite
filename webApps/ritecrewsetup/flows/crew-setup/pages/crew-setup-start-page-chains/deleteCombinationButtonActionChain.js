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

  class deleteCombinationButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.combinationSelectedRow.combination_id) {
        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/deleteCrewRite_TimeEntryCombinations',
          uriParams: {
            'p_combination_id': $variables.combinationSelectedRow.combination_id,
          },
        });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'The Record Has been Deleted',
            type: 'confirmation',
            displayMode: 'transient',
          });

          const response2 = await Actions.callRest(context, {
            endpoint: 'CrewRite_ORDS/getCrewRite_TimeEntryCombinations',
            uriParams: {
              'p_crewsetup_id': $variables.crewSetupHeaderObj.crewsetup_id,
            },
          });

          $variables.combinationAdp.data = response2.body.items;

        }
      } 
    }
  }

  return deleteCombinationButtonActionChain;
});
