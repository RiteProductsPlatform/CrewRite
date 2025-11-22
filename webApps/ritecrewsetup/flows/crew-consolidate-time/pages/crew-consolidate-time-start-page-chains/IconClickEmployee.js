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

  class IconClickEmployee extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.empSearchParam',
    '$page.variables.EmployeeNameADP.data',
  ],
      });

      const dlgEmployeeSearchOpen = await Actions.callComponentMethod(context, {
        selector: '#dlg-employee-search',
        method: 'open',
      });
    }
  }

  return IconClickEmployee;
});
