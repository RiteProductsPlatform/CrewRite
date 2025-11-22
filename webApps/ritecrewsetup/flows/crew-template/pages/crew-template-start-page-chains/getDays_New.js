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

  class getDays_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      if ($page.variables.crewSetupHeaderObj.start_date && $page.variables.crewSetupHeaderObj.end_date) {
        const dayValues = await $functions.dayValuesDefault($variables.crewSetupHeaderObj.start_date, $variables.crewSetupHeaderObj.end_date);

        $variables.crewSetupHeaderObj.crew_end_week = dayValues.endDay;
        $variables.crewSetupHeaderObj.crew_start_week = dayValues.startDay;

        const daysOfWeek = await $functions.getDaysOfWeek(dayValues.startDay, dayValues.endDay);

        $variables.headerweekObj = daysOfWeek;
      }
    }
  }

  return getDays_New;
});
