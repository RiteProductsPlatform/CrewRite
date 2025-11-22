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

  class SelectValueItemChangeChain2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      debugger;

      $variables.linesObj.EquipmentName = data.equipment_name;
      $variables.linesObj.equipment_Id = data.equipment_id;
      $variables.linesObj.equipment_number = data.equipment_number;
      $variables.linesObj.equpclass = data.equipment_class;
    }
  }

  return SelectValueItemChangeChain2;
});
