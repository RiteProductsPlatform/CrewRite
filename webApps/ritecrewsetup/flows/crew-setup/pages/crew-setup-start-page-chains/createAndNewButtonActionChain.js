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

  class createAndNewButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const saveCombinationData = await $functions.saveCombinationData($variables.combinationObj, $application.user.username, $variables.crewSetupHeaderObj);

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/postCrewRite_TimeEntryCombinations',
        body: saveCombinationData,
      });

      if (response.ok) {
        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Combination Created ',
          type: 'confirmation',
          displayMode: 'transient',
        });

        await Actions.resetVariables(context, {
          variables: [
    '$variables.combinationObj',
  ],
        });

      }else{
        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Create Combination',
          type: 'error',
          displayMode: 'transient',
        });
        
      }
    }
  }

  return createAndNewButtonActionChain;
});
