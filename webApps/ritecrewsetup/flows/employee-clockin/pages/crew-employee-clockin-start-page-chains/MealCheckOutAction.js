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

  class MealCheckOutAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      const currentDateTime = await $functions.getCurrentDateTime();
      $variables.checkDetails.mealChkout = currentDateTime;
      const timeDifference = await $functions.timeDifference($variables.checkDetails.mealChkin, $variables.checkDetails.mealChkout);
      $variables.checkDetails.mealtotal = timeDifference;
    }
  }

  return MealCheckOutAction;
});
