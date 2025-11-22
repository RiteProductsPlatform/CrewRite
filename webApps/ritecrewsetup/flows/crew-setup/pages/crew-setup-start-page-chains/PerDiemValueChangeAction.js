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

  class PerDiemValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $constants, $variables } = context;



      if (value === true) {
        $variables.linesObj.perdiem_flag = true;
      } else {
        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.linesObj.perdiem_flag',
  ],
        });
      }
    }
  }

  return PerDiemValueChangeAction;
});
