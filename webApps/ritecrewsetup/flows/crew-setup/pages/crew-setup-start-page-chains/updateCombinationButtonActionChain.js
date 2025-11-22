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

  class updateCombinationButtonActionChain extends ActionChain {

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

      let saveCombinationData = await $functions.saveCombinationData($variables.combinationObj, $application.user.username, $variables.crewSetupHeaderObj);

      saveCombinationData.p_combination_id = $variables.combinationObj.combination_id;

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/putCrewRite_TimeEntryCombinations',
        body: saveCombinationData,
      });

      if (response.ok) {
        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'The combination has been successfully updated',
          type: 'confirmation',
          displayMode: 'transient',
        });
        
      }else{
        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Failed To Update Combination',
          type: 'error',
          displayMode: 'transient',
          message: 'Please Contact Administrator',
        });
        
      }
    }
  }

  return updateCombinationButtonActionChain;
});
