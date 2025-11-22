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

  class AddNewResourcerequest extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.currentRowBuffer',
  ],
      });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.CrewTemplateTblADP,
        add: {
          data: $variables.currentRowBuffer,
        },
      });
    }
  }

  return AddNewResourcerequest;
});
