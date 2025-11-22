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

  class getCrewRite_EmployeeDetailsFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_EmployeeDetails',
        responseType: 'getCrewRiteEmployeeDetailsResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
        uriParams: {
          'p_emp_full_name': $variables.linesObj.resource_name ? $variables.linesObj.resource_name : ' ',
        },
      });

      return callRestEndpoint1;
    }
  }

  return getCrewRite_EmployeeDetailsFetch;
});
