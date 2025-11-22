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

  class CloseEditDlgAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const editTimesheetsClose = await Actions.callComponentMethod(context, {
        selector: '#editTimesheets',
        method: 'close',
      });
    }
  }

  return CloseEditDlgAction;
});
