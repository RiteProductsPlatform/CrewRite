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

  class ReprocessBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const reprocessDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#reprocessDialog',
        method: 'open',
      });

      $variables.ReprocesstblADP.data = $variables.FilteredData.length > 0 ? $variables.FilteredData : $variables.SearchTimeSheetADP.data;
      $variables.isLogDetails = false;
    }
  }

  return ReprocessBtnAction;
});
