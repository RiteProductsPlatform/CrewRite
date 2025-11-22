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

  class ButtonActionChain4 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // Wait for 300 milliseconds before trying to open the dialog
      await new Promise((resolve) => setTimeout(resolve, 900));

      const ojDialog10004582381Open = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-1000458238-1',
        method: 'open',
      });
    }
  }

  return ButtonActionChain4;
});
