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

  class trashIconActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;


      if (current.row.combination_id) {
        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/deleteCrewRite_TimeEntryCombinations',
          uriParams: {
            'p_combination_id': current.row.combination_id,
          },
        });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'The record has been deleted',
            type: 'error',
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

       

      } else {
        await Actions.fireDataProviderEvent(context, {
          target: $variables.combinationAdp,
          remove: {
            keys: [key],
          },
        });
      }


    }
  }

  return trashIconActionChain;
});
