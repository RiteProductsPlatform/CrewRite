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

      const ojDialog15974832941Open = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-1597483294-1',
        method: 'open',
      });
    }
  }

  return ButtonActionChain;
});
