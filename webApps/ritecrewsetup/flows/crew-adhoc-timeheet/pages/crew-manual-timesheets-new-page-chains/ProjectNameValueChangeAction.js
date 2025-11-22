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

  class ProjectNameValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      debugger;

      $variables.headerParams.projectId = data.project_id;
      $variables.headerParams.projectNumber = data.project_number;

      const response = await Actions.callRest(context, {
        endpoint: 'FSCM_REST_API/getProjectIdChildTasks',
        uriParams: {
          ProjectId: $variables.headerParams.projectId
        },
      });

      // const response = await Actions.callRest(context, {
      //   endpoint: 'TimeRite_Ords_Service/ProjectTaskPWA',
      //   uriParams: {
      //     'project_id': $variables.headerParams.projectId,
      //   },
      // });
      if (response.ok) {
        $variables.TasksADP.data = response.body.items;
      }
    }
  }

  return ProjectNameValueChangeAction;
});
