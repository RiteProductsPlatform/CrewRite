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

  class ResetBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.searchObj',
    '$page.variables.ChartADP.data',
    '$page.variables.CrewTblADP.data',
  ],
      });

      await Actions.callChain(context, {
        chain: 'SearchBtnAction',
      });
    }
  }

  return ResetBtnAction;
});
