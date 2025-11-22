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

  class CloseDialog extends ActionChain {
    async run(context) {
      const { $variables } = context;
      const customDialogClose = await Actions.callComponentMethod(context, {
        selector: '#custom-dialog',
        method: 'close',
      });

      $variables.crewApplicationControlObj.p_payroll_lockdown = false;
    }
  }

  return CloseDialog;
});
