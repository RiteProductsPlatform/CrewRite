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

  class closeResourceDlgActione extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const resourceDialogClose = await Actions.callComponentMethod(context, {
        selector: '#resourceDialog',
        method: 'close',
      });
    }
  }

  return closeResourceDlgActione;
});
