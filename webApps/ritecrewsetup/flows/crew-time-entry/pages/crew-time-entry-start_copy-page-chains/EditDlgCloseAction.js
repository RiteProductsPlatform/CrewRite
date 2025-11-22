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

  class EditDlgCloseAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callComponentMethodCnfirmationDlgCloseResult = await Actions.callComponentMethod(context, {
        selector: '#cnfirmationDlg',
        method: 'close',
      });
    }
  }

  return EditDlgCloseAction;
});
