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

  class ResumeToWorkActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      $variables.mealBreak = true;

      await $functions.stopMealBreakTimer();

      const currentDateTime1 = await $functions.getCurrentDateTime1();

      $variables.userLoginDetail.MealCheckOut = currentDateTime1;

      const timeDifference = await $functions.timeDifference($variables.userLoginDetail.MealCheckIn, $variables.userLoginDetail.MealCheckOut);

      $variables.userLoginDetail.MealTotal = timeDifference;
    }
  }

  return ResumeToWorkActionChain;
});
