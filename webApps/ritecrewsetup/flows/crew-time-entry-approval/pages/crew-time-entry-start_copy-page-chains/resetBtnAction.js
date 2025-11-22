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

  class resetBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.searchobj.contract',
          '$page.variables.searchobj.customer',
          '$page.variables.searchobj.date',
          '$page.variables.searchobj.project',
          '$page.variables.searchobj.timecrew',
          '$page.variables.TimeSheetADP.data',
        ],
      });
    }
  }

  return resetBtnAction;
});
