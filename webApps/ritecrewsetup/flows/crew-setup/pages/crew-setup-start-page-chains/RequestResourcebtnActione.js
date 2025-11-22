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

  class RequestResourcebtnActione extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getCrewTemplateLines',
        uriParams: {
          'crew_template_id': $variables.searchTemplateId,
        },
      });

      if (response.ok) {
        $variables.CrewTemplateTblADP.data = response.body.items;
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'No Template Lines found',
          displayMode: 'transient',
        });

      }

      document.querySelector('#resourceRequest').open();

    }
  }

  return RequestResourcebtnActione;
});
