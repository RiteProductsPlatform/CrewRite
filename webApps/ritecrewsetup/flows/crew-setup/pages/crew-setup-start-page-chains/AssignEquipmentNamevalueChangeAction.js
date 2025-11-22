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

  class AssignEquipmentNamevalueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.addEquipObj.resource_location = data.default_location;
      $variables.addEquipObj.resource_number = data.equipment_number;
      $variables.addEquipObj.EquipmentName = data.lkpvalue;
    }
  }

  return AssignEquipmentNamevalueChangeAction;
});
