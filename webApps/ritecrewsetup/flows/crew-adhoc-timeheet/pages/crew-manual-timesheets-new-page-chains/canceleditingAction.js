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

  class canceleditingAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.createObj',
  ],
      });

      const editTimesheetsClose = await Actions.callComponentMethod(context, {
        selector: '#editTimesheets',
        method: 'close',
      });
    }
  }

  return canceleditingAction;
});
