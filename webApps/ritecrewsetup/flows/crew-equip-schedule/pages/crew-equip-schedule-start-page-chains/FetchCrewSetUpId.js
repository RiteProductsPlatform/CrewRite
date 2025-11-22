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

  class FetchCrewSetUpId extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetCrewNameLOV',
      });

      $variables.crewSetupId = response.body.items[0].crewsetup_id;

      await Actions.callChain(context, {
        chain: 'searchActionChain',
      });
    }
  }

  return FetchCrewSetUpId;
});
