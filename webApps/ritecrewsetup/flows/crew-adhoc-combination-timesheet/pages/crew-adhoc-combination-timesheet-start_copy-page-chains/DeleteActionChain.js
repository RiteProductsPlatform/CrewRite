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

  class DeleteActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/deleteCrewRite_TimeEntryCombinations',
        uriParams: {
          'p_combination_id': $variables.tempCombinationObj.combination_id,
        },
      });

      await Actions.resetVariables(context, {
        variables: [
    '$variables.tempCombinationObj',
  ],
      });

      await Actions.callChain(context, {
        chain: 'searchButtonActionChain',
      });

      const ojDialogDeleteConfirmClose = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-delete-confirm',
        method: 'close',
      });
    }
  }

  return DeleteActionChain;
});
