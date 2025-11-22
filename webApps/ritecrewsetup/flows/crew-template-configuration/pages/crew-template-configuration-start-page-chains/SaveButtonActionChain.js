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

  class SaveButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      let result = true;
      debugger;

      const results = await ActionUtils.forEach($variables.templateADP.data, async (item, index) => {

        const postObj = await $functions.geneRatePayload($application.user.email, $variables.tempHeader, item);
        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/postCrewRite_TimeEntryTemplate',
          body: postObj,
        }); 
        if (!response.ok) {
          result = false;
        }
    
        
      }, { mode: 'serial' });

      if (result) {
        await Actions.fireNotificationEvent(context, {
          displayMode: 'transient',
          type: 'confirmation',
          summary: 'Mappings Added Successfully',
        });
      }
       else {
        await Actions.fireNotificationEvent(context, {
          type: 'error',
          displayMode: 'transient',
          summary: 'Failed to Add Mappings',
        });
      }


     

     
    }
  }

  return SaveButtonActionChain;
});
