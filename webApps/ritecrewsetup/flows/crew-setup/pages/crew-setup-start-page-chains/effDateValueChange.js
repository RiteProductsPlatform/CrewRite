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

  class effDateValueChange extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $functions, $variables } = context;
      debugger;

      if ($page.variables.linesObj.effective_start_date_copy !== null && $page.variables.linesObj.effective_end_date_copy !== null) {

        const callFunctionResultLinesObj = await $functions.getUniqueDayNamesBetweenDatesNew($variables.linesObj.effective_start_date_copy, $variables.linesObj.effective_end_date_copy);

        $page.variables.linesweekObj = callFunctionResultLinesObj;
        $page.variables.linesObj.mon_in_time = callFunctionResultLinesObj.Monday ? $page.variables.crewSetupHeaderObj.mon_in_time : "00:00";
        $page.variables.linesObj.mon_out_time = callFunctionResultLinesObj.Monday ? $page.variables.crewSetupHeaderObj.mon_out_time : "00:00";
        $page.variables.linesObj.mon_quantity = callFunctionResultLinesObj.Monday ? $page.variables.crewSetupHeaderObj.mon_quantity : "0";
        $page.variables.linesObj.tue_in_time = callFunctionResultLinesObj.Tuesday ? $page.variables.crewSetupHeaderObj.tue_in_time : "00:00";
        $page.variables.linesObj.tue_out_time = callFunctionResultLinesObj.Tuesday ? $page.variables.crewSetupHeaderObj.tue_out_time : "00:00";
        $page.variables.linesObj.tue_quantity = callFunctionResultLinesObj.Tuesday ? $page.variables.crewSetupHeaderObj.tue_quantity : "0";
        $page.variables.linesObj.wed_in_time = callFunctionResultLinesObj.Wednesday ? $page.variables.crewSetupHeaderObj.wed_in_time : "00:00";
        $page.variables.linesObj.wed_out_time = callFunctionResultLinesObj.Wednesday ? $page.variables.crewSetupHeaderObj.wed_out_time : "00:00";
        $page.variables.linesObj.wed_quantity = callFunctionResultLinesObj.Wednesday ? $page.variables.crewSetupHeaderObj.wed_quantity : "0";
        $page.variables.linesObj.thu_in_time = callFunctionResultLinesObj.Thursday ? $page.variables.crewSetupHeaderObj.thu_in_time : "00:00";
        $page.variables.linesObj.thu_out_time = callFunctionResultLinesObj.Thursday ? $page.variables.crewSetupHeaderObj.thu_out_time : "00:00";
        $page.variables.linesObj.thu_quantity = callFunctionResultLinesObj.Thursday ? $page.variables.crewSetupHeaderObj.thu_quantity : "0";
        $page.variables.linesObj.fri_in_time = callFunctionResultLinesObj.Friday ? $page.variables.crewSetupHeaderObj.fri_in_time : "00:00";
        $page.variables.linesObj.fri_out_time = callFunctionResultLinesObj.Friday ? $page.variables.crewSetupHeaderObj.fri_out_time : "00:00";
        $page.variables.linesObj.fri_quantity = callFunctionResultLinesObj.Friday ? $page.variables.crewSetupHeaderObj.fri_quantity : "0";
        $page.variables.linesObj.sat_in_time = callFunctionResultLinesObj.Saturday ? $page.variables.crewSetupHeaderObj.sat_in_time : "00:00";
        $page.variables.linesObj.sat_out_time = callFunctionResultLinesObj.Saturday ? $page.variables.crewSetupHeaderObj.sat_out_time : "00:00";
        $page.variables.linesObj.sat_quantity = callFunctionResultLinesObj.Saturday ? $page.variables.crewSetupHeaderObj.sat_quantity : "0";
        $page.variables.linesObj.sun_in_time = callFunctionResultLinesObj.Sunday ? $page.variables.crewSetupHeaderObj.sun_in_time : "00:00";
        $page.variables.linesObj.sun_out_time = callFunctionResultLinesObj.Sunday ? $page.variables.crewSetupHeaderObj.sun_out_time : "00:00";
        $page.variables.linesObj.sun_quantity = callFunctionResultLinesObj.Sunday ? $page.variables.crewSetupHeaderObj.sun_quantity : "0";
      }

      if ($page.variables.addEquipObj.effective_start_date_copy !== null && $page.variables.addEquipObj.effective_end_date_copy !== null) {

        const callFunctionResult = await $functions.getUniqueDayNamesBetweenDatesNew($variables.addEquipObj.effective_start_date_copy, $variables.addEquipObj.effective_end_date_copy);

        $page.variables.linesweekObj = callFunctionResult;
        $page.variables.addEquipObj.mon_in_time = callFunctionResult.Monday ? $page.variables.crewSetupHeaderObj.mon_in_time : "00:00";
        $page.variables.addEquipObj.mon_out_time = callFunctionResult.Monday ? $page.variables.crewSetupHeaderObj.mon_out_time : "00:00";
        $page.variables.addEquipObj.mon_quantity = callFunctionResult.Monday ? $page.variables.crewSetupHeaderObj.mon_quantity : "0";
        $page.variables.addEquipObj.tue_in_time = callFunctionResult.Tuesday ? $page.variables.crewSetupHeaderObj.tue_in_time : "00:00";
        $page.variables.addEquipObj.tue_out_time = callFunctionResult.Tuesday ? $page.variables.crewSetupHeaderObj.tue_out_time : "00:00";
        $page.variables.addEquipObj.tue_quantity = callFunctionResult.Tuesday ? $page.variables.crewSetupHeaderObj.tue_quantity : "0";
        $page.variables.addEquipObj.wed_in_time = callFunctionResult.Wednesday ? $page.variables.crewSetupHeaderObj.wed_in_time : "00:00";
        $page.variables.addEquipObj.wed_out_time = callFunctionResult.Wednesday ? $page.variables.crewSetupHeaderObj.wed_out_time : "00:00";
        $page.variables.addEquipObj.wed_quantity = callFunctionResult.Wednesday ? $page.variables.crewSetupHeaderObj.wed_quantity : "0";
        $page.variables.addEquipObj.thu_in_time = callFunctionResult.Thursday ? $page.variables.crewSetupHeaderObj.thu_in_time : "00:00";
        $page.variables.addEquipObj.thu_out_time = callFunctionResult.Thursday ? $page.variables.crewSetupHeaderObj.thu_out_time : "00:00";
        $page.variables.addEquipObj.thu_quantity = callFunctionResult.Thursday ? $page.variables.crewSetupHeaderObj.thu_quantity : "0";
        $page.variables.addEquipObj.fri_in_time = callFunctionResult.Friday ? $page.variables.crewSetupHeaderObj.fri_in_time : "00:00";
        $page.variables.addEquipObj.fri_out_time = callFunctionResult.Friday ? $page.variables.crewSetupHeaderObj.fri_out_time : "00:00";
        $page.variables.addEquipObj.fri_quantity = callFunctionResult.Friday ? $page.variables.crewSetupHeaderObj.fri_quantity : "0";
        $page.variables.addEquipObj.sat_in_time = callFunctionResult.Saturday ? $page.variables.crewSetupHeaderObj.sat_in_time : "00:00";
        $page.variables.addEquipObj.sat_out_time = callFunctionResult.Saturday ? $page.variables.crewSetupHeaderObj.sat_out_time : "00:00";
        $page.variables.addEquipObj.sat_quantity = callFunctionResult.Saturday ? $page.variables.crewSetupHeaderObj.sat_quantity : "0";
        $page.variables.addEquipObj.sun_in_time = callFunctionResult.Sunday ? $page.variables.crewSetupHeaderObj.sun_in_time : "00:00";
        $page.variables.addEquipObj.sun_out_time = callFunctionResult.Sunday ? $page.variables.crewSetupHeaderObj.sun_out_time : "00:00";
        $page.variables.addEquipObj.sun_quantity = callFunctionResult.Sunday ? $page.variables.crewSetupHeaderObj.sun_quantity : "0";
      }
    }
  }

  return effDateValueChange;
});
