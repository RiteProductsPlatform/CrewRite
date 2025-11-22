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

  class BonusFlagValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (value !== true) {

        $variables.linesObj.bonus_flag = false;
      } else {
        $variables.linesObj.bonus_flag = true;
      }
    }
  }

  return BonusFlagValueChangeAction;
});
