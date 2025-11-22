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

  class addEmployeeDialogOpenActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // debugger;
      
      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_ProjectResourceValidation',
      });

      if (response.ok) {
        $variables.resourceADP.data = response.body.items;
      }

      const addEmployeeOpen = await Actions.callComponentMethod(context, {
        selector: '#addEmployee',
        method: 'open',
      });
    }
  }

  return addEmployeeDialogOpenActionChain;
});
