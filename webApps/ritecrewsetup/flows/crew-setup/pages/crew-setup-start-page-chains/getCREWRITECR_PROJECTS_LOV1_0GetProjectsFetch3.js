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

  class getCREWRITECR_PROJECTS_LOV1_0GetProjectsFetch3 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'CrewRite_OIC/getCREWRITECR_PROJECTS_LOV1_0GetProjects',
        responseType: 'getCREWRITECRPROJECTSLOV1GetProjectsResponse2',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return getCREWRITECR_PROJECTS_LOV1_0GetProjectsFetch3;
});
