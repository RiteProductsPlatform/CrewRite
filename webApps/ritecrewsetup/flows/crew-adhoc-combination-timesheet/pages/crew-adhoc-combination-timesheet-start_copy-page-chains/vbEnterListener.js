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

  class vbEnterListener extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;


      const response = await Actions.callRest(context, {
        endpoint: 'FSCM_REST_API/getProjectsLOV',
        uriParams: {
          fields: 'ProjectId,ProjectName,ProjectNumber,ProjectStatus',
          onlyData: 'true',
          limit: '50',
        },
      });

      $variables.projectsLOV.data = response.body.items;
    }
  }

  return vbEnterListener;
});
