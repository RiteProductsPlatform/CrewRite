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

  class AssignActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const modifiedData = await this.modifyData(context, { consolidationCurrentRow: $variables.tempCombinationRowObj, empADP: $variables.selectedResoursesArr, timeEntriesADP: $variables.timeEntriesTableADP.data, selectedEmpADP: $variables.selectedResoursesArr });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.timeEntriesTableADP,
        update: {
          data: modifiedData.finalArr,
        },
      });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.mainTimeEntriesTableADP,
        add: {
          data: modifiedData.emptyArr,
        },
      });

      // $variables.mainTimeEntriesTableADP.data = modifiedData.emptyArr;

      const ojDialogCombinationResourceMappingClose = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-Combination-Resource-Mapping',
        method: 'close',
      });
    }

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object[]} params.empADP
     * @param {object[]} params.timeEntriesADP
     * @param {object} params.consolidationCurrentRow
     */
    async modifyData(context, { selectedEmpADP, timeEntriesADP, consolidationCurrentRow }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      //console.log("KKK",selectedEmpADP, timeEntriesADP, consolidationCurrentRow);
      let latestTimeEntriesArr = timeEntriesADP;
      let emptyArr = [];

      selectedEmpADP.forEach(element => {
        let loopResourceNumber = element.resource_number;
        let loopTimeEntryArr = timeEntriesADP.filter(item => item.resource_number == loopResourceNumber);
        //console.log('KKK', loopResourceNumber, loopTimeEntryArr);
        let loopTImeEntryObj = {
          "crewsetup_id": loopTimeEntryArr[0].crewsetup_id,
          "crewsetup_line_id": loopTimeEntryArr[0].crewsetup_line_id,
          "project_id": loopTimeEntryArr[0].project_id,
          "project_number": loopTimeEntryArr[0].project_number,
          "task_id": loopTimeEntryArr[0].task_id,
          "task_name": loopTimeEntryArr[0].task_name,
          "resource_type": loopTimeEntryArr[0].resource_type,
          "resource_number": loopTimeEntryArr[0].resource_number,
          "resource_name": loopTimeEntryArr[0].resource_name,
          "resource_role": loopTimeEntryArr[0].resource_role,
          "bill_rate": loopTimeEntryArr[0].bill_rate,
          "pay_rate": loopTimeEntryArr[0].pay_rate,
          "ot_rate": loopTimeEntryArr[0].ot_rate,
          "resource_location": loopTimeEntryArr[0].resource_location,
          "equipment_category": loopTimeEntryArr[0].equipment_category,
          "equipment_rate": loopTimeEntryArr[0].equipment_rate,
          "active_flag": loopTimeEntryArr[0].active_flag,
          "crew_day": loopTimeEntryArr[0].crew_day,
          "effective_start_date": loopTimeEntryArr[0].effective_start_date,
          "effective_end_date": loopTimeEntryArr[0].effective_end_date,
          "creation_date": loopTimeEntryArr[0].creation_date,
          "last_updated_date": loopTimeEntryArr[0].last_updated_date,
          "last_updated_by": loopTimeEntryArr[0].last_updated_by,
          "created_by": loopTimeEntryArr[0].created_by,
          "crew_week": loopTimeEntryArr[0].crew_week,
          "time_entry_mode": loopTimeEntryArr[0].time_entry_mode,
          "week_start_date": loopTimeEntryArr[0].week_start_date,
          "week_end_date": loopTimeEntryArr[0].week_end_date,
          "assignment_number": loopTimeEntryArr[0].assignment_number,
          "po": loopTimeEntryArr[0].po,
          "po_line": loopTimeEntryArr[0].po_line,
          "approver_comments": loopTimeEntryArr[0].approver_comments,
          "customer_id": loopTimeEntryArr[0].customer_id,
          "contract_id": loopTimeEntryArr[0].contract_id,
          "start_date": loopTimeEntryArr[0].start_date,
          "end_date": loopTimeEntryArr[0].end_date,
          "project_assigned": loopTimeEntryArr[0].project_assigned,
          "project_role": loopTimeEntryArr[0].project_role,
          "resource_id": loopTimeEntryArr[0].resource_id,
          "expenditure_type_id": loopTimeEntryArr[0].expenditure_type_id,
          "expenditure_type_name": loopTimeEntryArr[0].expenditure_type_name,
          "city": loopTimeEntryArr[0].city,
          "country": loopTimeEntryArr[0].country,
          "addressline1": loopTimeEntryArr[0].addressline1,
          "addressline2": loopTimeEntryArr[0].addressline2,
          "postalcode": loopTimeEntryArr[0].postalcode,
          "latitude": loopTimeEntryArr[0].latitude,
          "longitude": loopTimeEntryArr[0].longitude,
          "equipment_assigned_flag": loopTimeEntryArr[0].equipment_assigned_flag,
          "equipment_assigned_id": loopTimeEntryArr[0].equipment_assigned_id,
          "per_diem_amount": loopTimeEntryArr[0].per_diem_amount,
          "per_diem_rate": loopTimeEntryArr[0].per_diem_rate,
          "bonus_amount": loopTimeEntryArr[0].bonus_amount,
          "bonus_rate": loopTimeEntryArr[0].bonus_rate,
          "crew_setup_lines_rownum": loopTimeEntryArr[0].crew_setup_lines_rownum,
          "perdiem_flag": loopTimeEntryArr[0].perdiem_flag,
          "perdiem_quantity": loopTimeEntryArr[0].perdiem_quantity,
          "bonus_flag": loopTimeEntryArr[0].bonus_flag,
          "bonus_quantity": loopTimeEntryArr[0].bonus_quantity,
          "non_labour_resource": loopTimeEntryArr[0].non_labour_resource,
          "non_labor_resource_org": loopTimeEntryArr[0].non_labor_resource_org,
          "equipment_number": loopTimeEntryArr[0].equipment_number,
          "ot_threshold_limit": loopTimeEntryArr[0].ot_threshold_limit,
          "data_source": loopTimeEntryArr[0].data_source,
          "crew_date": loopTimeEntryArr[0].crew_date,
          "comments": loopTimeEntryArr[0].comments,
          "sub_pay": loopTimeEntryArr[0].sub_pay,
          "rate": loopTimeEntryArr[0].rate,
          "timecard_balancing": loopTimeEntryArr[0].timecard_balancing,
          "hours_validation": loopTimeEntryArr[0].hours_validation,
          "time_type": consolidationCurrentRow.time_type,
          "total_hours": consolidationCurrentRow.hours,
          "location": consolidationCurrentRow.location_tax_jurisdiction,
          "combination_id": consolidationCurrentRow.combination_id,
          "combination_name": consolidationCurrentRow.combination_name,
          "work_package": consolidationCurrentRow.work_package,
          "cost_category": consolidationCurrentRow.cost_category,
          "department": consolidationCurrentRow.department,
          "project": consolidationCurrentRow.project,
          "shift": consolidationCurrentRow.shift,
          "timeEntryId" : loopTimeEntryArr[0].resource_id + consolidationCurrentRow.combination_id + loopTimeEntryArr[0].crewsetup_line_id
        };
        //loopTimeEntryArr[0].combination_name = consolidationCurrentRow.combination_name;
        // loopTimeEntryArr[0].cost_category = consolidationCurrentRow.cost_category;
        // loopTimeEntryArr[0].department = consolidationCurrentRow.department;
        // loopTimeEntryArr[0].location = consolidationCurrentRow.location_tax_jurisdiction;
        // loopTimeEntryArr[0].work_package = consolidationCurrentRow.work_package;
        //emptyArr.push(loopTimeEntryArr);
        emptyArr.push(loopTImeEntryObj);
      });
      //console.log("MMM",emptyArr);
      // emptyArr.forEach(ele =>
      //   finalArr = latestTimeEntriesArr.map((obj) => obj.resource_number === ele.resource_number ? ele : obj)
      // );
  
      let arr2Map = new Map(emptyArr.map(item => [item.resource_number, item]));
      let finalArr = latestTimeEntriesArr.map(obj1 => {
        let matchingObj2 = arr2Map.get(obj1.resource_number);
        return matchingObj2 || obj1;
      });
      let endReturn = {finalArr,emptyArr};
      //console.log("MMM", finalArr);
      return endReturn;
    }
  }

  return AssignActionChain;
});
