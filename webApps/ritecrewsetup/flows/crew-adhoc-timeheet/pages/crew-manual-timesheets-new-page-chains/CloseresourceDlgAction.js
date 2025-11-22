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

  class CloseresourceDlgAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.AddResourceParams',
  ],
      });

      const addresourceClose = await Actions.callComponentMethod(context, {
        selector: '#addresource',
        method: 'close',
      });
    }
  }

  return CloseresourceDlgAction;
});
