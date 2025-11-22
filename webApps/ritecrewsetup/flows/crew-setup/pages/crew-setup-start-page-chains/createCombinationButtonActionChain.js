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

  class createCombinationButtonActionChain extends ActionChain {

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

        await Actions.fireNotificationEvent(context, {
          summary: 'Combination Created',
          type: 'confirmation',
          displayMode: 'transient',
        });

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        const combinationFormClose = await Actions.callComponentMethod(context, {
          selector: '#combinationForm',
          method: 'close',
        });

        await Actions.callChain(context, {
          chain: 'combinationFormDialogCloseActionChain',
        });
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Create Combination',
          type: 'warning',
          displayMode: 'transient',
        });

        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
        
      }
    }
  }

  return createCombinationButtonActionChain;
});
