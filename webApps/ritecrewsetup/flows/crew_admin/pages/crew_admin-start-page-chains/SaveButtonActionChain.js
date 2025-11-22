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
      let isResult = true;

      const results = await ActionUtils.forEach($variables.controlsADP.data, async (item, index) => {
        if (item.isNew === 'Yes') {
          item.lookup_type_id = $variables.controlsADP.data.length!==0?$variables.controlsADP.data[0].lookup_type_id:"";
          const payload = await $functions.getLookupPayload($application.user.email, item);          
          const response = await Actions.callRest(context, {
            endpoint: 'CrewRite_ORDS/postCrewRite_CrewDefinitionLookups',
            body: payload,
          });

          if (!response.ok) {
           isResult = false;
          
          }
        }



      }, { mode: 'serial' });

      if (isResult) {       
           await Actions.fireNotificationEvent(context, {
              summary: 'Saved Successfully',
              displayMode: 'transient',
              type: 'confirmation',
            });       
      }
    }
  }

  return SaveButtonActionChain;
});
