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

  class TR_FetchprojectsAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      debugger;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetProjectDetails',
        uriParams: {
          'contract_id': $variables.RowData.contract_id,
        },
      });

      if (response.ok) {
        await Actions.resetVariables(context, {
          variables: [
            '$variables.ProjectsTblADP',
          ],
        });

        const projectDetailsRefresh = await Actions.callComponentMethod(context, {
          selector: '#project_details',
          method: 'refresh',
        });

        $variables.ProjectsTblADP.data = response.body.items;

        $variables.varTabSelection = 'Projects';
      }
      else {
        await Actions.fireNotificationEvent(context, {
          type: 'error',
          displayMode: 'transient',
          summary: 'failed to fetch Projects',
        });

      }
    }
  }

  return TR_FetchprojectsAction_New;
});
