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

  class ValidatingCrewActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetCrewNameLOV',
      });

      const areAllItemsPresent = await $functions.areAllItemsPresent(response.body.items, $variables.crewSetupHeaderObj.crew_name);

      if (areAllItemsPresent) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Crew Already Present',
          type: 'error',
          displayMode: 'persist',
          message: 'Proceed With Another Crew Name',
        });

      }else{

        await Actions.callChain(context, {
          chain: 'TR_CreateheadersAction_New',
        });

      }
    }
  }

  return ValidatingCrewActionChain;
});
