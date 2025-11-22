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

  class SelectValueItemChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getCrewTemplateHeader',
        uriParams: {
          'template_name': $variables.searchTemplate,
        },
      });

      $variables.crewSetupHeaderObj.crew_end_week = response.body.items[0].crew_end_week;
      $variables.crewSetupHeaderObj.crew_measure = response.body.items[0].crew_measure;
      $variables.crewSetupHeaderObj.crew_scope = response.body.items[0].scope;
      $variables.crewSetupHeaderObj.crew_start_week = response.body.items[0].crew_start_week;
      $variables.crewSetupHeaderObj.crew_type = response.body.items[0].type;
      $variables.crewSetupHeaderObj.end_date = response.body.items[0].end_date;
      $variables.crewSetupHeaderObj.fri_in_time = response.body.items[0].fri_in_time;
      $variables.crewSetupHeaderObj.fri_out_time = response.body.items[0].fri_out_time;
      $variables.crewSetupHeaderObj.fri_quantity = response.body.items[0].fri_quantity;
      $variables.crewSetupHeaderObj.hours_type = response.body.items[0].hours_type;
      $variables.crewSetupHeaderObj.mon_in_time = response.body.items[0].mon_in_time;
      $variables.crewSetupHeaderObj.mon_out_time = response.body.items[0].mon_out_time;
      $variables.crewSetupHeaderObj.mon_quantity = response.body.items[0].mon_quantity;
      $variables.crewSetupHeaderObj.sat_in_time = response.body.items[0].sat_in_time;
      $variables.crewSetupHeaderObj.sat_out_time = response.body.items[0].sat_out_time;
      $variables.crewSetupHeaderObj.sat_quantity = response.body.items[0].sat_quantity;
      $variables.crewSetupHeaderObj.start_date = response.body.items[0].start_date;
      $variables.crewSetupHeaderObj.sun_in_time = response.body.items[0].sun_in_time;
      $variables.crewSetupHeaderObj.sun_out_time = response.body.items[0].sun_out_time;
      $variables.crewSetupHeaderObj.sun_quantity = response.body.items[0].sun_quantity;
      $variables.crewSetupHeaderObj.template_id = response.body.items[0].template_id;
      $variables.crewSetupHeaderObj.thu_in_time = response.body.items[0].thu_in_time;
      $variables.crewSetupHeaderObj.thu_out_time = response.body.items[0].thu_out_time;
      $variables.crewSetupHeaderObj.thu_quantity = response.body.items[0].thu_quantity;
      $variables.crewSetupHeaderObj.time_entry_method = response.body.items[0].time_method;
      $variables.crewSetupHeaderObj.tue_in_time = response.body.items[0].tue_in_time;
      $variables.crewSetupHeaderObj.tue_out_time = response.body.items[0].tue_out_time;
      $variables.crewSetupHeaderObj.tue_quantity = response.body.items[0].tue_quantity;
      $variables.crewSetupHeaderObj.wed_in_time = response.body.items[0].wed_in_time;
      $variables.crewSetupHeaderObj.wed_out_time = response.body.items[0].wed_out_time;
      $variables.crewSetupHeaderObj.wed_quantity = response.body.items[0].wed_quantity;

      $variables.copyEnable = true;

    }
  }

  return SelectValueItemChangeChain1;
});
