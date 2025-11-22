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

  class InputNumberValueChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {number} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     */
    async run(context, { event, previousValue, value, updatedFrom }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.custDetailsObj.bonus_hours && $variables.custDetailsObj.bonus_rate) {
        $variables.custDetailsObj.bonus_amount = $variables.custDetailsObj.bonus_hours * $variables.custDetailsObj.bonus_rate;
      } else {
        $variables.custDetailsObj.bonus_amount = 0;
      }
    }
  }

  return InputNumberValueChangeChain1;
});
