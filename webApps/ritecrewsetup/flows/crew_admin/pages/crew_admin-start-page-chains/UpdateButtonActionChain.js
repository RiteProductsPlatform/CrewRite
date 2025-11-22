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

  class UpdateButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/putCrewRite_Settings',
        body: $variables.crewApplicationControlObj,
      });

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Configuration Updated Successfully',
          type: 'confirmation',
          displayMode: 'transient',
        });
       
      }
      else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Configuration Update Failed',
          displayMode: 'transient',
          type: 'error',
        });
        
      }
    }
  }

  return UpdateButtonActionChain;
});
