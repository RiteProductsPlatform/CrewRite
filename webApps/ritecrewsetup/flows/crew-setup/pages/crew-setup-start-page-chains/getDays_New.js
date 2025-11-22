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

      if ($variables.crewSetupHeaderObj.start_date && $variables.crewSetupHeaderObj.end_date) {
        const dayValuesDefault = await $functions.dayValuesDefault($variables.crewSetupHeaderObj.start_date, $variables.crewSetupHeaderObj.end_date);
         $variables.crewSetupHeaderObj.crew_start_week =dayValuesDefault.startDay;
         $variables.crewSetupHeaderObj.crew_end_week =dayValuesDefault.endDay;
        const daysOfWeek = await $functions.getDaysOfWeek(dayValuesDefault.startDay, dayValuesDefault.endDay);

        $variables.headerweekObj = daysOfWeek;

        
      }

    }
  }

  return getDays_New;
});
