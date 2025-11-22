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

  class ResourceDlgopenAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/TR_OraclePersonDetails',
      });

      const uniqueResource = await $functions.getuniqueResource(JSON.stringify(response.body.items));
      $variables.ResourcesArray = uniqueResource;
      $variables.AddResourceParams.crewName = $variables.headerParams.crewName;
      $variables.AddResourceParams.crewId = $variables.headerParams.crewId;
      $variables.AddResourceParams.projectName = $variables.headerParams.projectName;
      $variables.AddResourceParams.projectId = $variables.headerParams.projectId;
      $variables.AddResourceParams.projectNumber = $variables.headerParams.projectNumber;
      $variables.AddResourceParams.per_deim_rate = $variables.headerParams.per_deim_rate;
      $variables.AddResourceParams.per_deim_amount = $variables.headerParams.per_deim_amount;
      $variables.AddResourceParams.date = $variables.headerParams.date;
      const addresourceOpen = await Actions.callComponentMethod(context, {
        selector: '#addresource',
        method: 'open',
      });
    }
  }

  return ResourceDlgopenAction;
});
