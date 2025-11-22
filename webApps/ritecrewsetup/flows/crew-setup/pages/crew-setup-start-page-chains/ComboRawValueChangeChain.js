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

  class ComboRawValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {string} params.previousValue
     * @param {string} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.rawValue
     */
    async run(context, { event, previousValue, value, updatedFrom, rawValue }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.resourceDtlsADP',
  ],
      });

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_EmployeeDetails',
        uriParams: {
          'p_emp_full_name': value,
        },
      });

      $variables.resourceDtlsADP.data = response.body.items;

      await Actions.fireDataProviderEvent(context, {
        refresh: null,
        target: $variables.resourceDtlsADP,
      });
    }
  }

  return ComboRawValueChangeChain;
});
