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

  class EditiconClickAction extends ActionChain {

    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.createObj.p_action = current.row.action
        ; $variables.createObj.p_created_by = current.row.created_by
        ; $variables.createObj.p_crew_date = current.row.crew_date
        ; $variables.createObj.p_crew_name = current.row.crew_name
        ; $variables.createObj.p_person_id = current.row.person_id
        ; $variables.createObj.p_crewsetup_id = current.row.crewsetup_id
        ; $variables.createObj.p_in_time = current.row.in_time
        ; $variables.createObj.p_last_updated_by = $application.user.email
        ; $variables.createObj.p_project_id = current.row.project_id
        ; $variables.createObj.p_project_name = current.row.project_name
        ; $variables.createObj.p_project_number = current.row.project_number
        ; $variables.createObj.p_resource_name = current.row.resource_name
        ; $variables.createObj.p_resource_number = current.row.resource_number
        ; $variables.createObj.p_resource_role = current.row.resource_role
        ; $variables.createObj.p_task_id_1 = current.row.task_id_1
        ; $variables.createObj.p_task_id_2 = current.row.task_id_2
        ; $variables.createObj.p_task_id_3 = current.row.task_id_3
        ; $variables.createObj.p_task_id_4 = current.row.task_id_4
        ; $variables.createObj.p_task_name_1 = current.row.task_name_1
        ; $variables.createObj.p_task_name_2 = current.row.task_name_2
        ; $variables.createObj.p_task_name_3 = current.row.task_name_3
        ; $variables.createObj.p_task_name_4 = current.row.task_name_4
        ; $variables.createObj.p_task_number_1 = current.row.task_number_1
        ; $variables.createObj.p_task_number_2 = current.row.task_number_2
        ; $variables.createObj.p_task_number_3 = current.row.task_number_3
        ; $variables.createObj.p_task_number_4 = current.row.task_number_4
        ; $variables.createObj.p_task1_hours = current.row.task1_hours
        ; $variables.createObj.p_task2_hours = current.row.task2_hours
        ; $variables.createObj.p_task3_hours = current.row.task3_hours
        ; $variables.createObj.p_task4_hours = current.row.task4_hours
        ; $variables.createObj.p_work_location = current.row.work_location
         ; $variables.createObj.p_per_deim_rate = current.row.per_deim_rate
        ; $variables.createObj.p_per_deim_amount = current.row.per_deim_amount;


      const editTimesheetsOpen = await Actions.callComponentMethod(context, {
        selector: '#editTimesheets',
        method: 'open',
        params: current,
      });
    }
  }

  return EditiconClickAction;
});
