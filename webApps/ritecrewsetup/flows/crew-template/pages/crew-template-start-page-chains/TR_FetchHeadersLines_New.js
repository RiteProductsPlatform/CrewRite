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

  class TR_FetchHeadersLines_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.crewSetupHeaderObj',
  ],
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getCrewTemplateHeader',
        uriParams: {
          'template_name': $variables.searchCrew,
        },
      });

      if (response.ok) {
        $variables.IsSearch = true;
        $variables.crewTemplateHeader = response.body.items[0];

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getCrewTemplateLines',
        });

        if (response2.ok) {
          if ($page.variables.AssignEnabled) {
            $variables.crewSetupLines.data = response2.body.items;

            $variables.IsEdit = true;

            
          }
        }
        else{
          await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch Lines',
          displayMode: 'transient',
          type: 'error',
        });
        }
      }
      else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch Headers',
          displayMode: 'transient',
          type: 'error',
        });
        
      }
    }
  }

  return TR_FetchHeadersLines_New;
});
