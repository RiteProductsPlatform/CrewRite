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
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getResourceMetedata',
        uriParams: {
          'resource_name': value,
        },
      });

      $variables.AddResourceParams.resource_number = response.body.items[0].resource_id;
      $variables.AddResourceParams.resource_number = response.body.items[0].resource_number;
      $variables.AddResourceParams.resource_job = response.body.items[0].resource_job;
      $variables.AddResourceParams.resource_location = response.body.items[0].resource_location;

    }
  }

  return ComboValueChangeChain;
});
