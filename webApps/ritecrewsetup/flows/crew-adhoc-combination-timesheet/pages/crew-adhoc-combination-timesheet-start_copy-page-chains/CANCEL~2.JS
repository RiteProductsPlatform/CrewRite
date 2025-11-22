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

  class CancelDeleteActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.tempCombinationObj.combination_id',
    '$variables.tempCombinationObj',
  ],
      });

      const ojDialogDeleteConfirmClose = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-delete-confirm',
        method: 'close',
      });
    }
  }

  return CancelDeleteActionChain;
});
