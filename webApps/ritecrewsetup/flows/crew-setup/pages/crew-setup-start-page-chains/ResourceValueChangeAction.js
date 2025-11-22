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

  class ResourceValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $page.variables.linesObj.resource_number = data.resource_number;
      $page.variables.linesObj.resource_role = data.resource_job;
      $page.variables.linesObj.resource_location = data.resource_location;
      $page.variables.linesObj.project_assigned = data.project_assigned;
      $page.variables.linesObj.resource_id = data.resource_id;

      if ($page.variables.linesObj.project_assigned === "N") {

        $page.variables.resourceMessage[0] = {
          "detail": "Selected Resource is not part of Project assigned resources",
          "summary": "",
          "severity": "info",
        };
      } else {
        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.resourceMessage',
  ],
        });
      }
    }
  }

  return ResourceValueChangeAction;
});
