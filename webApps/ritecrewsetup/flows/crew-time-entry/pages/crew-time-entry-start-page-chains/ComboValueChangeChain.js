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

  class ComboValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     */
    async run(context, { event, previousValue, value, updatedFrom }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.addEmpObj.resourceName) {
        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_ProjectResourceValidation',
          uriParams: {
            'p_resource_name': $variables.addEmpObj.resourceName,
          },
        });

        if (response.ok) {
          $variables.addEmpObj.resourecNumber = response.body.items[0].resource_number;
          $variables.addEmpObj.resourceRole = response.body.items[0].resource_job;
          $variables.addEmpObj.resourceLocation = response.body.items[0].resource_location;
          $variables.addEmpObj.project_assigned = response.body.items[0].project_assigned;
          $variables.addEmpObj.assignment_id = response.body.items[0].assignment_id;
          $variables.addEmpObj.assignment_number = response.body.items[0].assignment_number;
          $variables.addEmpObj.resource_id = response.body.items[0].resource_id;

        }
      } else {
        await Actions.resetVariables(context, {
          variables: [
    '$variables.addEmpObj.resourecNumber',
    '$variables.addEmpObj.resourceRole',
    '$variables.addEmpObj.resourceLocation',
    '$variables.addEmpObj.project_assigned',
     '$variables.addEmpObj.assignment_id',
    '$variables.addEmpObj.assignment_number',
    '$variables.addEmpObj.resource_id',
  ],
        });

      }
    }
  }

  return ComboValueChangeChain;
});
