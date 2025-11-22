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

  class MealBrkInActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await $functions.startMealBreakTimer();

      $variables.mealBreak = false;

      const currentDateTime1 = await $functions.getCurrentDateTime1();

      $variables.userLoginDetail.MealCheckIn = currentDateTime1;
    }
  }

  return MealBrkInActionChain;
});
