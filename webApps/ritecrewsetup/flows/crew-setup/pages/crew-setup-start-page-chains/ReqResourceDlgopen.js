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

  class ReqResourceDlgopen extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-1000458238-1',
        method: 'open',
      });

    }
  }

  return ReqResourceDlgopen;
});
