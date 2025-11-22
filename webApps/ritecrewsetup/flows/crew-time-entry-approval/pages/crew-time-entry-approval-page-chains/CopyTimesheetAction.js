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

  class CopyTimesheetAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.copyweek',
  ],
      });

      const copyDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#copyDialog',
        method: 'open',
      });

    }
  }

  return CopyTimesheetAction;
});
