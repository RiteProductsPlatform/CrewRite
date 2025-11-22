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

  class BtnSaveDlgEmpSearch extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (Object.keys($page.variables.SelectedEmpRow).length > 0) {
        $page.variables.SearchParams.employee_name = $page.variables.SelectedEmpRow.PersonName;

        const dlgEmployeeSearchClose = await Actions.callComponentMethod(context, {
          selector: '#dlg-employee-search',
          method: 'close',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please select atleast one row',
          displayMode: 'transient',
        });
      }
    }
  }

  return BtnSaveDlgEmpSearch;
});
