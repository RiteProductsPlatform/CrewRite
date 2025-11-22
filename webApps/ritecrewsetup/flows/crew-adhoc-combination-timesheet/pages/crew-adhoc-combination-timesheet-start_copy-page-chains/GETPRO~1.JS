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

  class getProjectsLOVFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response2 = await Actions.callRest(context, {
        endpoint: 'CrewRite_OIC/getCREWRITECR_PROJECTS_LOV1_0GetProjects',
      });

      return response2;
    }
  }

  return getProjectsLOVFetch;
});
