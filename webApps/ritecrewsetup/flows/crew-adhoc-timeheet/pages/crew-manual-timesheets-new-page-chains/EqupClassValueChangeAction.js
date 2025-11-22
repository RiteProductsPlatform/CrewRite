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

  class EqupClassValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response2 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetEquipmentLOV',
        uriParams: {
          pClass: data.equipment_class,
        },
      });

      if (!response2.ok) {
      
        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.equipNameArray',
  ],
        });

        return;
      } else {
        $variables.equipNameArray = response2.body.items;
      }
    }
  }

  return EqupClassValueChangeAction;
});
