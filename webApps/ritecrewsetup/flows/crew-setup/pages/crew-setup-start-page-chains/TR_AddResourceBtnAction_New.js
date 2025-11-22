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

  class TR_AddResourceBtnAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
     '$variables.ResourcesArray',
    '$variables.linesObj',
    // '$variables.crewSetupHeaderObj.end_date',
  ],
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getCrewAdminDetails',
      });

      const response2 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/CustDetails',
        uriParams: {
          'customer_number': $variables.crewSetupHeaderObj.customer_name,
        },
      });

      const effectiveDate = await $functions.effectiveDate($variables.crewSetupHeaderObj.start_date);

$variables.linesObj.customer_id        = $page.variables.crewSetupHeaderObj.customer_id;
$variables.linesObj.crewsetup_id       = $page.variables.crewSetupHeaderObj.crewsetup_id;
$variables.linesObj.contract_id        = $page.variables.crewSetupHeaderObj.contract_id;
$variables.linesObj.project_number     = $page.variables.crewSetupHeaderObj.project_number ? $page.variables.crewSetupHeaderObj.project_number : "";
$variables.linesObj.project_id         = $page.variables.crewSetupHeaderObj.project_id ? $page.variables.crewSetupHeaderObj.project_id : "";
$variables.linesObj.project_name       = $page.variables.crewSetupHeaderObj.project_name;
$variables.linesObj.mon_in_time        = $page.variables.crewSetupHeaderObj.mon_in_time;
$variables.linesObj.mon_out_time       = $page.variables.crewSetupHeaderObj.mon_out_time;
$variables.linesObj.mon_quantity       = $page.variables.crewSetupHeaderObj.mon_quantity;
$variables.linesObj.sat_in_time        = $page.variables.crewSetupHeaderObj.sat_in_time;
$variables.linesObj.sat_out_time       = $page.variables.crewSetupHeaderObj.sat_out_time;
$variables.linesObj.sat_quantity       = $page.variables.crewSetupHeaderObj.sat_quantity;
$variables.linesObj.sun_in_time        = $page.variables.crewSetupHeaderObj.sun_in_time;
$variables.linesObj.sun_out_time       = $page.variables.crewSetupHeaderObj.sun_out_time;
$variables.linesObj.sun_quantity       = $page.variables.crewSetupHeaderObj.sun_quantity;
$variables.linesObj.thu_in_time        = $page.variables.crewSetupHeaderObj.thu_in_time;
$variables.linesObj.thu_out_time       = $page.variables.crewSetupHeaderObj.thu_out_time;
$variables.linesObj.thu_quantity       = $page.variables.crewSetupHeaderObj.thu_quantity;
$variables.linesObj.tue_in_time        = $page.variables.crewSetupHeaderObj.tue_in_time;
$variables.linesObj.tue_out_time       = $page.variables.crewSetupHeaderObj.tue_out_time;
$variables.linesObj.tue_quantity       = $page.variables.crewSetupHeaderObj.tue_quantity;
$variables.linesObj.wed_in_time        = $page.variables.crewSetupHeaderObj.wed_in_time;
$variables.linesObj.wed_out_time       = $page.variables.crewSetupHeaderObj.wed_out_time;
$variables.linesObj.wed_quantity       = $page.variables.crewSetupHeaderObj.wed_quantity;
$variables.linesObj.bonus_quantity     = response.body.items[0].bonus_hours;
$variables.linesObj.bonus_rate         = response.body.items[0].bonus_rate;
$variables.linesObj.perdiem_quantity   = response.body.items[0].per_dm_hours;
$variables.linesObj.per_diem_rate      = response.body.items[0].per_dm_rate;
$variables.linesObj.ot_threshold_limit =   response2.body.items.length > 0 
    ? response2.body.items[0].ot_threshold_limit  : "0";
      $variables.minEffeDate = await $functions.effectiveDate(new Date());

      const response3 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getResourcesDetails',
        uriParams: {
          'project_id': $page.variables.crewSetupHeaderObj.crew_specific === "PROJECT SPECIFIC"? $page.variables.linesObj.project_id :"",
        },
      });

      const uniqueResource = await $functions.getuniqueResource(response3.body.items);

      $variables.ResourcesArray = uniqueResource;

      const response4 = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_ProjectResourceValidation',
      });
      if(response4.ok){
        $variables.resourceADP.data = response4.body.items;
      }    

      const resourceDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#resourceDialog',
        method: 'open',
      });

    }
  }

  return TR_AddResourceBtnAction_New;
});
