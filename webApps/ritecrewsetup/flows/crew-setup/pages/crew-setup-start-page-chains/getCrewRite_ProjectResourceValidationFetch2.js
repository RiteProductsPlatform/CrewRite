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

  class getCrewRite_ProjectResourceValidationFetch2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_ProjectResourceValidation',
        responseType: 'getCrewRiteProjectResourceValidationResponse4',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
        uriParams: {
          q: $variables.linesObj.resource_name,
        },
      });

      return callRestEndpoint1;
    }
  }

  return getCrewRite_ProjectResourceValidationFetch2;
});
