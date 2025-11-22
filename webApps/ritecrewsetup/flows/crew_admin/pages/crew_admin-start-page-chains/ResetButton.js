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

  class ResetButton extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.syncData',
          '$page.variables.syncEmployee',
          '$page.variables.disableSync',
          '$page.variables.disableDownload',
        ],
      });
    }
  }

  return ResetButton;
});
