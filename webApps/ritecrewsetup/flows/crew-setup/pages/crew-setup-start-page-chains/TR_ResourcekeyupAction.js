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

  class TR_ResourcekeyupAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.currValue 
     */
    async run(context, { currValue }) {
      const { $page, $flow, $application } = context;

      if (currValue.length > 2) {
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.ResourcesArray',
          ],
        });

        const callRestTimeRiteOrdsServiceGetResourcesDetailsResult = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getResourcesDetails',
          uriParams: {
            'res_name': currValue,
            'project_id': $page.variables.crewSetupHeaderObj.crew_specific === "PROJECT SPECIFIC"? $page.variables.linesObj.project_id :"",
          },
        });

        $page.variables.ResourcesArray = callRestTimeRiteOrdsServiceGetResourcesDetailsResult.body.items;
      }else if(currValue.length <=0){
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.ResourcesArray',
          ],
        });

       const callRestTimeRiteOrdsServiceGetResourcesDetailsResult1 = await Actions.callRest(context, {
         endpoint: 'TimeRite_Ords_Service/getResourcesDetails',
         uriParams: {
           'project_id': $page.variables.crewSetupHeaderObj.crew_specific === "PROJECT SPECIFIC"? $page.variables.linesObj.project_id :"",
           'res_name': "",
         },
       });

        $page.variables.ResourcesArray = callRestTimeRiteOrdsServiceGetResourcesDetailsResult1.body.items;

      }
    }
  }

  return TR_ResourcekeyupAction;
});
