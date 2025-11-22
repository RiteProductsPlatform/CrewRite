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

  class EquipLinesProjectChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $variables } = context;
      debugger;
      $page.variables.addEquipObj.project_id = data.project_id;
      $variables.addEquipObj.project_number = data.projec_number;
    }
  }

  return EquipLinesProjectChangeAction;
});
