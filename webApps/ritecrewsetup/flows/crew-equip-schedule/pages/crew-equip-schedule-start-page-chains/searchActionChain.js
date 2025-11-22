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

  class searchActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.scheduleMainADP',
  ],
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetCrewSetUpLines2',
        uriParams: {
          'crewsetup_id': $variables.crewSetupId,
          'resource_id': $variables.resourceName ? $variables.resourceName : "",
        },
      });

      if(response.ok){
         const alterRespFunc = await $functions.alterResp(response.body.items);
      }
      
    }
  }

  return searchActionChain;
});
