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

  class SubmitBtnAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      const results = await ActionUtils.forEach($page.variables.SubmittedRows, async (item, index) => {
        $variables.createObj.p_crewsetup_id = $page.variables.headerParams.crewId;
        $variables.createObj.p_crew_name = $page.variables.headerParams.crewName;
        $variables.createObj.p_crew_date = item.crew_date;
        $variables.createObj.p_person_id = item.person_id;
        $variables.createObj.p_resource_role = item.resource_role;
        $variables.createObj.p_resource_name = item.resource_name;
        $variables.createObj.p_overwritepayable = "";
        $variables.createObj.p_project_id = $page.variables.headerParams.projectId;
        $variables.createObj.p_project_number = $page.variables.headerParams.projectNumber;
        $variables.createObj.p_project_name = $page.variables.headerParams.projectName;
        $variables.createObj.p_task_id_1 = item.task_id_1;
        $variables.createObj.p_task_id_2 = item.task_id_2 ? item.task_id_2 : null;
        $variables.createObj.p_task_id_3 = item.task_id_3 ? item.task_id_3 : null;
        $variables.createObj.p_task_id_4 = item.task_id_4 ? item.task_id_4 : null;
        $variables.createObj.p_task4_hours = item.task4_hours ? item.task4_hours : null;
        $variables.createObj.p_task_name_4 = item.task_name_4 ? item.task_name_4 : null;
        $variables.createObj.p_task_number_4 = item.task_number_4 ? item.task_number_4 : "";
        $variables.createObj.p_task1_hours = item.task1_hours ? item.task1_hours : null;
        $variables.createObj.p_task_name_1 = item.task_name_1 ? item.task_name_1 : null;
        $variables.createObj.p_task_number_1 = item.task_number_1 ? item.task_number_1 : null;
        $variables.createObj.p_task3_hours = item.task3_hours ? item.task3_hours : null;
        $variables.createObj.p_task_name_3 = item.task_name_3 ? item.task_name_3 : null;
        $variables.createObj.p_task_number_3 = item.task_number_3 ? item.task_number_3 : null;
        $variables.createObj.p_task2_hours = item.task2_hours ? item.task2_hours : null;
        $variables.createObj.p_task_name_2 = item.task_name_2 ? item.task_name_2 : null;
        $variables.createObj.p_task_number_2 = item.task_number_2 ? item.task_number_2 : null;
        $variables.createObj.p_in_time = "";
        $variables.createObj.p_per_dm_rate = $page.variables.headerParams.per_deim_rate;
        $variables.createObj.p_per_dm_amount = $page.variables.headerParams.per_deim_amount;

        const results2 = await ActionUtils.forEach($variables.taskTblADP.data, async (item1, index1) => {

          const payloadGenerator = await $functions.payloadGenerator(item, $application.user.email, $page.variables.headerParams.date, $page.variables.headerParams.date
            , "", $page.variables.headerParams.date, $page.variables.headerParams, $page.variables.maxweekid, item1);

          const results3 = await Promise.all([
            async () => {

              const response = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/postTR_ManualTimeEntry_Main',
                body: payloadGenerator,
              });
            },
            async () => {

              const response2 = await Actions.callRest(context, {
                endpoint: 'TimeRite_Ords_Service/postTR_Manual_Timeentry_Submit',
                body: $variables.createObj,
              });

              if (!response2.ok) {
                $variables.successvar = $page.variables.successvar + 1;

              }
            },
          ].map(sequence => sequence()));



        }, { mode: 'serial' });


      }, { mode: 'serial' });

      if ($page.variables.SubmittedRows.length !== $page.variables.successvar) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Timesheets Submitted successfully',
          type: 'confirmation',
          displayMode: 'transient',
        });

        await Actions.resetVariables(context, {
          variables: [
            '$variables.AdhocMainUITableADP',
          ],
        });

        const response3 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getManualTimeEntriesHdr',
          uriParams: {
            'crew_date': $functions.formatDate($page.variables.headerParams.date),
            'crewsetup_id': $variables.headerParams.crewId,
            'project_id': $variables.headerParams.projectId,
            'task_id_1': $variables.headerParams.task_id_1 ? $variables.headerParams.task_id_1 : "",
            'task_id_2': $variables.headerParams.task_id_2 ? $variables.headerParams.task_id_2 : "",
            'task_id_3': $variables.headerParams.task_id_3 ? $variables.headerParams.task_id_3 : "",
            'task_id_4': $variables.headerParams.task_id_4 ? $variables.headerParams.task_id_4 : "",
          },
        });

        if (response3.ok) {
          $variables.AdhocMainUITableADP.data = response3.body.items;

        }

      }
    }
  }

  return SubmitBtnAction_New;
});
