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

  class TR_SearchBtnAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.isAdd = false;
      await Actions.callChain(context, {
        chain: 'TR_fetchSearchSheetData_New',
      });
    }
  }

  return TR_SearchBtnAction_New;
});
