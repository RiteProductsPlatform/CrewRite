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

  class disbandCnfmationDlgOpen_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const disbandAppDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#disbandAppDialog',
        method: 'open',
      });
    }
  }

  return disbandCnfmationDlgOpen_New;
});
