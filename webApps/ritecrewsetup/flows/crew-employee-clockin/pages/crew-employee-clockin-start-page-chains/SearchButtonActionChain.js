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

  class SearchButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/ResourceNamebyCrewId',
        uriParams: {
          'crewsetup_id': $variables.checkHdrs.crewId,
        },
      });

      if (response.ok) {
       const crewData= await $functions.getNewPayload($variables.checkHdrs.crewName, response.body.items);
        $variables.crewChkADP.data = crewData;
     
      }
    }
  }

  return SearchButtonActionChain;
});
