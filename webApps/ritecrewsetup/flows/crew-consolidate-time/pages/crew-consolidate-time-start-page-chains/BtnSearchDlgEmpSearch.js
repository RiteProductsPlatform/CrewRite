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

  class BtnSearchDlgEmpSearch extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.EmployeeNameADP.data',
          '$page.variables.EmployeeNameADP',
        ],
      });

      const callRestEmpSearch = await Actions.callRest(context, {
        endpoint: 'FSCM_REST_API/fetchEmployeesFromProject',
        uriParams: {
          limit: '500',
          onlyData: 'true',
          'project_num': $page.variables.SearchParams.project_num ? $page.variables.SearchParams.project_num : '',
          fields: 'PersonEmail,PersonName,ProjectId,ProjectRole',
          q: `PersonName like '*${$variables.empSearchParam.emp_name ? $variables.empSearchParam.emp_name : ''}*'`,
        },
      });

      if (callRestEmpSearch.body.count > 0) {
        $page.variables.EmployeeNameADP.data = callRestEmpSearch.body.items;
      }
    }
  }

  return BtnSearchDlgEmpSearch;
});
