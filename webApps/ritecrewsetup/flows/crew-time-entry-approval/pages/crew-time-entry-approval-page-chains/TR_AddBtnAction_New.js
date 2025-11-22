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

  class TR_AddBtnAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.isAdd = true;

      await Actions.callChain(context, {
        chain: 'TR_FetchTimeSheetData_New',
      });
    }
  }

  return TR_AddBtnAction_New;
});
