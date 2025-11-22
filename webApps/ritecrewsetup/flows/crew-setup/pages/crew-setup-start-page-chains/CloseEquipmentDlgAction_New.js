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

  class CloseEquipmentDlgAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const equipmentDialogClose = await Actions.callComponentMethod(context, {
        selector: '#EquipmentDialog',
        method: 'close',
      });
    }
  }

  return CloseEquipmentDlgAction_New;
});
