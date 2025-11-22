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

  class InputTextValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetCrewNameLOV',
      });
      const areAllItemsPresent = await $functions.areAllItemsPresent(response.body.items, value);

      if (areAllItemsPresent) {
        await Actions.fireNotificationEvent(context, {
          summary: value+" "+"Was Already Present",
          type: 'error',
          displayMode: 'transient',
          message: 'Kindly Add With Another Name',
        });

        $variables.IsSearch = true;
      }
      
     
    }
  }

  return InputTextValueChangeChain;
});
