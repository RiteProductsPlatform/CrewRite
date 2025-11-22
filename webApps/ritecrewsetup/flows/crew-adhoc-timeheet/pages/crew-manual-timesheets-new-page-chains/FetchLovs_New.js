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

  class FetchLovs_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/ProjectDetailsPWA',
      });

      const response2 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getCrewAdminDetails',
      });

      $variables.ProjectsADP.data = response.body.items;
      $variables.headerParams.per_deim_amount = response2.body.items[0].per_dm_amount;
      $variables.headerParams.per_deim_rate = response2.body.items[0].per_dm_rate;
    }
  }

  return FetchLovs_New;
});
