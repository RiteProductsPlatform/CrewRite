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

  class fetchresource extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getResourcesDetails',
        uriParams: {
          'project_id': "",
          'res_name': "",
        },
      });

      const distinctresource = await $application.functions.distinctresource(JSON.stringify(response.body.items));

      $variables.ResourceNameArray = distinctresource;
    }
  }

  return fetchresource;
});
