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

  class SubmitButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const results = await ActionUtils.forEach($variables.selectedData, async (item, index) => {

        const dateFormatter = await $functions.dateFormatter(item.week_start_date, item.week_end_date, $variables.headerobj.crewDate);

      const payloadData = await this.generatePayloadFunc(context, { data: item, user: $application.user.email, startdate: dateFormatter.startDate, endDate: dateFormatter.endDate, daterange: null, crewDate: $variables.headerobj.crewDate, weekid: 11111 });

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postSubmitTimeSheet',
          body: payloadData,
        });
      }, { mode: 'serial' });
    }

    /**
     * @param {Object} context
     */
    async generatePayloadFunc(context,{data, user, startdate, endDate, daterange, crewDate, weekid}) {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const t1 = new Date();
    let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate();
    let creationDate = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
    let obj = {
      "action": "ADD",
      "assignment_number": data.assignment_number,
      "bill_rate": data.bill_rate,
      "crew_week": null,
      "crew_date": crewDate,
      "crewsetup_line_id": data.crewsetup_line_id,
      "equipment_category": data.equipment_category,
      "equipment_rate": data.equipment_rate,
      "fri_in_time": data.fri_in_time,
      "fri_out_time": data.fri_out_time,
      "mon_out_time": data.mon_out_time,
      "mon_in_time": data.mon_in_time,
      "ot_rate": data.ot_rate,
      "pay_rate": data.pay_rate,
      "resource_name": data.resource_name,
      "resource_role": data.resource_role,
      "resource_type": data.resource_type,
      "sat_in_time": data.sat_in_time,
      "sat_out_time": data.sat_out_time,
      "sun_in_time": data.sun_in_time,
      "sun_out_time": data.sun_out_time,
      "thu_in_time": data.thu_in_time,
      "thu_out_time": data.thu_out_time,
      "time_entry_mode": "CREATE",
      "total_hours": data.total_hours,
      "tue_in_time": data.tue_in_time,
      "tue_out_time": data.tue_out_time,
      "wed_in_time": data.wed_in_time,
      "wed_out_time": data.wed_out_time,
      "crewsetup_id": data.crewsetup_id,
      "person_id": data.resource_number,
      "po": data.po,
      "po_line": data.po_line,
      "project_id": data.project_id,
      "project_number": data.project_number,
      "project_name": data.project_name,
      "start_time": "",
      "status": "SUBMITTED",
      "stop_time": "",
      "task_id": data.task_id,
      "uom": "Hours",
      "week_end_date": data.week_end_date,
      "work_location": data.resource_location,
      "work_schedule": "REGULAR",
      "contract_id": data.contract_id,
      "created_by": user,
      "customer_id": data.customer_id,
      "fri_total_hours": data.fri_total_hours,
      "mon_total_hours": data.mon_total_hours,
      "sat_total_hours": data.sat_total_hours,
      "sun_total_hours": data.sun_total_hours,
      "thu_total_hours": data.thu_total_hours,
      "tue_total_hours": data.tue_total_hours,
      "wed_total_hours": data.wed_total_hours,
      "time_keeper_id": null,
      "supervisor_id": null,
      "secondary_timekeeper_id": null,
      "last_updated_by": user,
      "last_updated_date": creationDate,
      "week_start_date": data.week_start_date,
      "creation_date": creationDate,
      "timesheet_week_id": weekid,
      "perdiem_flag": data.perdiem_flag,
      "perdiem_quantity": data.perdiem_quantity,
      "per_diem_rate": data.per_diem_rate,
      "per_diem_amount": data.per_diem_amount,
      "bonus_flag": data.bonus_flag,
      "bonus_quantity": data.bonus_quantity,
      "bonus_rate": data.bonus_rate,
      "bonus_amount": data.bonus_amount,
      "time_type": data.time_type
    };
    return obj;
  }
  }

  return SubmitButtonActionChain;
});
