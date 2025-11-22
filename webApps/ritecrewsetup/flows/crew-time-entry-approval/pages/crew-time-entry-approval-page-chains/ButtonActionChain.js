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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const reprocessDialogClose = await Actions.callComponentMethod(context, {
        selector: '#reprocessDialog',
        method: 'close',
      });
    }
  }

  return ButtonActionChain;
});
