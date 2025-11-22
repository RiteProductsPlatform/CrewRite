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

  class TR_resourceValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $variables } = context;

      debugger;

      if ($variables.linesObj.resource_name) {

       
        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_ProjectResourceValidation',
          uriParams: {
            'p_resource_name': $variables.linesObj.resource_name,
          },
        });

        if(response.ok){         

        $page.variables.linesObj.resource_number = response.body.items[0].resource_number;
        $page.variables.linesObj.resource_role = response.body.items[0].resource_job;
        $page.variables.linesObj.resource_location = response.body.items[0].resource_location;
        $page.variables.linesObj.project_assigned = response.body.items[0].project_assigned;
        $page.variables.linesObj.resource_id = response.body.items[0].resource_id;
         $page.variables.linesObj.assignment_number = response.body.items[0].assignment_number;
         $page.variables.linesObj.assignment_id = response.body.items[0].assignment_id;
         

        }

        if ($page.variables.linesObj.project_assigned === 'N') {
          $page.variables.resourceMessage[0] = {
    "detail": 'Selected Resource is not part of Project assigned resources',
    "summary": '',
    "severity": 'info',
  };
        }
      }
      else {


        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.linesObj.resource_number',
            '$page.variables.linesObj.resource_role',
            '$page.variables.linesObj.resource_location',
            '$page.variables.linesObj.project_assigned',
            ' $page.variables.linesObj.resource_id'
          ],
        });
      }

    }
  }

  return TR_resourceValueChangeAction;
});
