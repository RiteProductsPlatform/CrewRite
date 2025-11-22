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

  class SaveIconClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions, $chain } = context;

      await $functions.printFunc(current.row.isNew);

      if (current.row.isNew === 'Y') {

        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/postCrewRite_TimeEntryCombinations',
          body: {
            'p_combination_id': current.row.combination_id,
            'p_combination_name': current.row.combination_name,
            'p_project': current.row.project,
            'p_task_date': current.row.task_date,
            'p_shift': current.row.shift,
            'p_location_tax_jurisdiction': current.row.location_tax_jurisdiction,
            'p_work_package': current.row.work_package,
            'p_department': current.row.department,
            'p_cost_category': current.row.cost_category,
            'p_time_type': current.row.time_type,
            'p_hours': current.row.hours,
            'p_crewsetup_id': $variables.headerobj.setupId,
            'p_crew_name': $variables.headerobj.crewname,
            'p_project_id': current.row.project_id,
            'p_project_number': current.row.project_number,
            'p_task_id': current.row.task_id,
            'p_task_number': current.row.task_number,
            'p_task_name': current.row.task_name
          },
        });
      }

      if (current.row.isNew !== 'Y') {
        const response2 = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/putCrewRite_TimeEntryCombinations',
          body: {
            'p_combination_id': current.row.combination_id,
            'p_combination_name': current.row.combination_name,
            'p_project': current.row.project,
            'p_task_date': current.row.task_date,
            'p_shift': current.row.shift,
            'p_location_tax_jurisdiction': current.row.location_tax_jurisdiction,
            'p_work_package': current.row.work_package,
            'p_department': current.row.department,
            'p_cost_category': current.row.cost_category,
            'p_time_type': current.row.time_type,
            'p_hours': current.row.hours,
            'p_crewsetup_id': $variables.headerobj.setupId,
            'p_crew_name': $variables.headerobj.crewname,
            'p_project_id': current.row.project_id,
            'p_project_number': current.row.project_number,
            'p_task_id': current.row.task_id,
            'p_task_number': current.row.task_number,
            'p_task_name': current.row.task_name
          },
        });

        // const dataModifiedArr = await this.dataModification(context, { mainTableADP: $variables.mainTimeEntriesTableADP.data, currentRowobj: current.row });

        //await $functions.printFunc(dataModifiedArr);
      }

      await Actions.callChain(context, {
        chain: 'searchButtonActionChain',
      });
    }

    /**
     * @param {Object} context
     */
    async dataModification(context, {mainTableADP,currentRowobj}) {
      const { $page, $flow, $application, $constants, $variables } = context;
        let finalArr = [];
        mainTableADP.forEach(element => {
          if(element.combination_id === currentRowobj.combination_id){
            let loopTImeEntryObj = {
          "crewsetup_id": element.crewsetup_id,
          "crewsetup_line_id": element.crewsetup_line_id,
          "project_id": currentRowobj.project_id,
          "project_number": currentRowobj.project_number,
          "task_id": currentRowobj.task_id,
          "task_name": currentRowobj.task_name,
          "resource_type": element.resource_type,
          "resource_number": element.resource_number,
          "resource_name": element.resource_name,
          "resource_role": element.resource_role,
          "bill_rate": element.bill_rate,
          "pay_rate": element.pay_rate,
          "ot_rate": element.ot_rate,
          "resource_location": element.resource_location,
          "equipment_category": element.equipment_category,
          "equipment_rate": element.equipment_rate,
          "active_flag": element.active_flag,
          "crew_day": element.crew_day,
          "effective_start_date": element.effective_start_date,
          "effective_end_date": element.effective_end_date,
          "creation_date": element.creation_date,
          "last_updated_date": element.last_updated_date,
          "last_updated_by": element.last_updated_by,
          "created_by": element.created_by,
          "crew_week": element.crew_week,
          "time_entry_mode": element.time_entry_mode,
          "week_start_date": element.week_start_date,
          "week_end_date": element.week_end_date,
          "assignment_number": element.assignment_number,
          "po": element.po,
          "po_line": element.po_line,
          "approver_comments": element.approver_comments,
          "customer_id": element.customer_id,
          "contract_id": element.contract_id,
          "start_date": element.start_date,
          "end_date": element.end_date,
          "project_assigned": element.project_assigned,
          "project_role": element.project_role,
          "resource_id": element.resource_id,
          "expenditure_type_id": element.expenditure_type_id,
          "expenditure_type_name": element.expenditure_type_name,
          "city": element.city,
          "country": element.country,
          "addressline1": element.addressline1,
          "addressline2": element.addressline2,
          "postalcode": element.postalcode,
          "latitude": element.latitude,
          "longitude": element.longitude,
          "equipment_assigned_flag": element.equipment_assigned_flag,
          "equipment_assigned_id": element.equipment_assigned_id,
          "per_diem_amount": element.per_diem_amount,
          "per_diem_rate": element.per_diem_rate,
          "bonus_amount": element.bonus_amount,
          "bonus_rate": element.bonus_rate,
          "crew_setup_lines_rownum": element.crew_setup_lines_rownum,
          "perdiem_flag": element.perdiem_flag,
          "perdiem_quantity": element.perdiem_quantity,
          "bonus_flag": element.bonus_flag,
          "bonus_quantity": element.bonus_quantity,
          "non_labour_resource": element.non_labour_resource,
          "non_labor_resource_org": element.non_labor_resource_org,
          "equipment_number": element.equipment_number,
          "ot_threshold_limit": element.ot_threshold_limit,
          "data_source": element.data_source,
          "crew_date": element.crew_date,
          "comments": element.comments,
          "sub_pay": element.sub_pay,
          "rate": element.rate,
          "timecard_balancing": element.timecard_balancing,
          "hours_validation": element.hours_validation,
          "time_type": currentRowobj.time_type,
          "total_hours": currentRowobj.hours,
          "location": currentRowobj.location_tax_jurisdiction,
          "combination_id": currentRowobj.combination_id,
          "combination_name": currentRowobj.combination_name,
          "work_package": currentRowobj.work_package,
          "cost_category": currentRowobj.cost_category,
          "department": currentRowobj.department,
          "project": currentRowobj.project,
          "shift": currentRowobj.shift,
          "timeEntryId" : element.resource_id + element.combination_id + element.crewsetup_line_id
        };
        finalArr.push(loopTImeEntryObj);
          }
        });
        return finalArr;
    }
  }

  return SaveIconClickChain;
});
