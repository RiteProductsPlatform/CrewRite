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

  class ButtonActionChain4 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postCrewAdminDetails',
        body: $variables.crewApplicationControlObj,
      });

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Crew Application Created Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      } else {
         await Actions.fireNotificationEvent(context, {
           summary: 'Failed to create Crew Application',
           displayMode: 'transient',
         });
      }

    }
  }

  return ButtonActionChain4;
});
