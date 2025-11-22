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

  class BtnCancelDlgEmpSearch extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const dlgEmployeeSearchClose = await Actions.callComponentMethod(context, {
        selector: '#dlg-employee-search',
        method: 'close',
      });
    }
  }

  return BtnCancelDlgEmpSearch;
});
