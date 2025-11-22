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

  class EditIconClickAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.dialogueLabel = 'Edit';
      $variables.linesObj = current.row;
      $variables.linesObj.effective_start_date_copy = current.row.effective_start_date;
      $variables.linesObj.effective_end_date_copy = current.row.effective_end_date;
      $variables.linesObj.project_number = current.row.project_number;
      const resourceDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#resourceDialog',
        method: 'open',
      });
    }
  }

  return EditIconClickAction;
});
