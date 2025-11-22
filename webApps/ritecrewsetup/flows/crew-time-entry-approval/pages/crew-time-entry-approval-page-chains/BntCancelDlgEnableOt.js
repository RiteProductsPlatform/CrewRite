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

  class BntCancelDlgEnableOt extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const dlgEnableOtClose = await Actions.callComponentMethod(context, {
        selector: '#dlg-enable-ot',
        method: 'close',
      });
    }
  }

  return BntCancelDlgEnableOt;
});
