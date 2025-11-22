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

      const dlgTaskListClose = await Actions.callComponentMethod(context, {
        selector: '#dlg-task-list',
        method: 'close',
      });
    }
  }

  return ButtonActionChain;
});
