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

  class TR_CONTRACT_NO_OF_DAYS_CHANGE_AC extends ActionChain {

    /**
     * Executes the action to calculate the number of days between the week start and week end.
     * @param {Object} context - The context containing page, flow, and application details.
     */
    async run(context) {
      const { $page } = context;
      // Get the number of weekdays between the week start and week end
      const callFunctionResult = await $page.functions.weekDaysCount(
        $page.variables.updateContracts.week_start_day, 
        $page.variables.updateContracts.week_end_day
      );
      $page.variables.updateContracts.no_of_days = callFunctionResult;
    }
  }

  return TR_CONTRACT_NO_OF_DAYS_CHANGE_AC;
});
