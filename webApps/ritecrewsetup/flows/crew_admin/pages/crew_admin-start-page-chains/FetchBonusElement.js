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

  class FetchBonusElement extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'HCM_REST_API/get11_13_18_05ElementEntries',
        uriParams: {
          limit: '10000',
          onlyData: 'true',
          fields: 'ElementEntryId,ElementName,ElementTypeId,CreatorType,PayrollRelationshipNumber,ElementName,EntryType,ElementTypeId,EntrySequence',
        },
      });

      let bonusEleADP = await $functions.bonusEleADP(JSON.stringify(response.body.items));

      const response2 = await Actions.callRest(context, {
        endpoint: 'HCM_REST_API/get11_13_18_05ElementEntries',
        uriParams: {
          limit: 10000,
          onlyData: 'true',
        },
      });

      const distinctElementnames = await $functions.distinctElementnames(JSON.stringify(response.body.items));

     // const response3 = await Actions.callRest(context, {
    //    endpoint: 'TimeRite_Ords_Service/getCrewAdminDetails',
    //  });

      const response3 = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_Settings',
      });


      
      //debugger;
      if(response3.ok){
      $variables.BonusEleArray = bonusEleADP;
      $variables.perDiemElementADP.data = bonusEleADP;
      $variables.PerdielArray = distinctElementnames;
      $variables.crewApplicationControlObj.p_crew_admin_rowid = response3.body.items[0].p_crew_admin_rowid;
      $variables.crewApplicationControlObj.p_bonus_dm_hour = response3.body.items[0].bonus_hours;
      $variables.crewApplicationControlObj.p_bonus_element_map = response3.body.items[0].bonus_element_map;
      $variables.crewApplicationControlObj.p_creator_type = "F";
      $variables.crewApplicationControlObj.p_currency = response3.body.items[0].currency;
      $variables.crewApplicationControlObj.p_element_entry_id = 0;
      $variables.crewApplicationControlObj.p_per_dm_element_type_id = response3.body.items[0].per_dm_element_type_id;
      $variables.crewApplicationControlObj.p_bonus_dm_element_type_id = response3.body.items[0].bonus_dm_element_type_id;
      $variables.crewApplicationControlObj.p_entry_sequence = null;
      $variables.crewApplicationControlObj.p_entry_type = "E";
      $variables.crewApplicationControlObj.p_maintain_bonus_rate_source = response3.body.items[0].maintain_bonus_rate_source;
      $variables.crewApplicationControlObj.p_maintain_perdeim_rate_source = response3.body.items[0].maintain_perdeim_rate_source;
      $variables.crewApplicationControlObj.p_otl_timetype_overtime = response3.body.items[0].otl_timetype_overtime;
      $variables.crewApplicationControlObj.p_payroll_lockdown = response3.body.items[0].payroll_lockdown;
      $variables.crewApplicationControlObj.p_payroll_lockdown_fromdate = response3.body.items[0].payroll_lockdown_fromdate;
      $variables.crewApplicationControlObj.p_payroll_lockdown_todate = response3.body.items[0].payroll_lockdown_todate;
      $variables.crewApplicationControlObj.p_per_dm_amount = response3.body.items[0].per_dm_amount;
      $variables.crewApplicationControlObj.p_per_dm_hour = response3.body.items[0].per_dm_hours;
      $variables.crewApplicationControlObj.p_per_dm_rate = response3.body.items[0].per_dm_rate;
      $variables.crewApplicationControlObj.p_bonus_map_amount = response3.body.items[0].bonus_amount;
      $variables.crewApplicationControlObj.p_bonus_map_rate = response3.body.items[0].bonus_rate;
      $variables.crewApplicationControlObj.p_per_dm_element_map = response3.body.items[0].per_dm_element_map;     
      $variables.crewApplicationControlObj.p_timesheet_balancing_require = response3.body.items[0].timesheet_balancing_require;
      $variables.crewApplicationControlObj.p_timesheet_entry_method = response3.body.items[0].timesheet_entry_method;
     
      $variables.crewApplicationControlObj.p_balancing_source = response3.body.items[0].balancing_source;
      $variables.crewApplicationControlObj.p_directory_path = response3.body.items[0].directory_path;
      $variables.crewApplicationControlObj.p_ftp_user_name = response3.body.items[0].ftp_user_name;
      $variables.crewApplicationControlObj.p_ftp_password = response3.body.items[0].ftp_password;



     
      }
      
      $variables.TimeEntrymethodADP.data = [
        {
          "method": "ONLINE"
        },
        {
          "method": "OFFLINE"
        }
      ];

      $variables.rateSourceADP.data = [{ "value": "HR Application" }, { "value": "Crew Time Application" }];
    }
  }

  return FetchBonusElement;
});
