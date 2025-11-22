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

  class combinationSaveActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      if ($variables.combinationAdp.data.length >= 1) {
        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });
        let isResponse;

        const results = await ActionUtils.forEach($variables.combinationAdp.data, async (item, index) => {

          const saveCombinationData = await $functions.saveCombinationData(item, $application.user.fullName, $variables.crewSetupHeaderObj);

          const response = await Actions.callRest(context, {
            endpoint: 'CrewRite_ORDS/postCrewRite_TimeEntryCombinations',
            body: saveCombinationData,
          });

          isResponse = response;
        }, { mode: 'serial' });

        if (isResponse.ok) {

          const loadingDialogOpen2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'open',
          });
          await Actions.fireNotificationEvent(context, {
            summary: 'Combination Saved',
            type: 'confirmation',
            displayMode: 'transient',
          });
        }else{
          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Save Combination',
            type: 'error',
            displayMode: 'transient',
          });
          
        }

        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'No Records To Save',
          type: 'info',
          displayMode: 'transient',
        });

      }
    }
  }

  return combinationSaveActionChain;
});
