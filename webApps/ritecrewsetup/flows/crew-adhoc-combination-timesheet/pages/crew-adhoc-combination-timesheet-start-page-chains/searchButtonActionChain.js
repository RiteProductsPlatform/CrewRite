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

  class searchButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validateGroup = await $functions.validateGroup('combinationValidation');

      if (validateGroup === 'valid') {

        await Actions.resetVariables(context, {
          variables: [
    '$variables.combinationsTableADP',
    '$variables.timeEntriesTableADP',
    '$variables.resourceTableADP',
    '$variables.combinationLOV',
    '$variables.disableFlag',
    '$variables.resourceLOVADP',
  ],
        });

        const response2 = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_CrewResources',
          uriParams: {
            'p_crewsetup_id': $variables.headerobj.setupId,
          },
        });

        $variables.resourceTableADP.data = response2.body.items;
        $variables.timeEntriesTableADP.data = response2.body.items;
        $variables.resourceLOVADP.data = response2.body.items;

        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_TimeEntryCombinations',
          uriParams: {
            'p_crewsetup_id': $variables.headerobj.setupId,
          },
        });

        $variables.combinationsTableADP.data = response.body.items;
        $variables.combinationLOV.data = response.body.items;
        $variables.disableFlag = false;
      }
    }
  }

  return searchButtonActionChain;
});
