define([], () => {
  'use strict';

  class PageModule {
    getsysdate() {
      let mydate = new Date();
      return mydate;
    };

    getHoursValidated(data) {
      // debugger
      // let data = JSON.parse(mydata);
      // Check if any record has "hours_validation": "Y"
      let isValid = data.some(record => record.hours_validation === "N");

      return isValid;
    }

    timeValidator(timeObj) {
      const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
      let isValid = true;
      let msg;
      days.forEach(day => {
        const inTime = timeObj[`${day}_in`];
        const outTime = timeObj[`${day}_out`];
        if (new Date(`1970-01-01T${inTime}`) > new Date(`1970-01-01T${outTime}`)) {
          msg = `Invalid time for ${day}: IN Time is greater than OUT Time`;
          isValid = false;
        }
      });
      return {
        "msg": msg,
        "isValid": isValid
      };
    }

    saveEmployeeData(data, user) {
      // debugger;
      let payload = {
        "crewsetup_id": data.crewsetupId,
        "customer_id": "",
        "contract_id": "",
        "project_id": data.projectId,
        "project_name": data.projectName,
        "project_number": data.projectNumber,
        "task_id": data.taskId,
        "task_name": data.taskName,
        "task_number": data.taskNumber,
        "po": "",
        "po_line": "",
        "resource_type": "EMPLOYEE",
        "resource_number": data.resourecNumber,
        "resource_name": data.resourceName,
        "resource_role": data.resourceRole,
        "resource_location": data.resourceLocation,
        "assignment_number": data.assignment_number,
        "equipment_category": "",
        "equipment_rate": "",
        "bill_rate": "",
        "pay_rate": "",
        "ot_rate": "",
        "active_flag": "",
        "effective_start_date": "",
        "effective_end_date": "",
        "start_date": this.formatDate(data.startDate),
        "end_date": this.formatDate(data.endDate),
        "project_assigned": data.project_assigned,
        "resource_id": data.resource_id,
        "expenditure_type_id": "",
        "expenditure_type_name": "",
        "time_entry_mode": "",
        "sun_in_time": data.sun_in,
        "sun_out_time": data.sun_out,
        "mon_in_time": data.mon_in,
        "mon_out_time": data.mon_out,
        "tue_in_time": data.tue_in,
        "tue_out_time": data.tue_out,
        "wed_in_time": data.wed_in,
        "wed_out_time": data.wed_out,
        "thu_in_time": data.thu_in,
        "thu_out_time": data.thu_out,
        "fri_in_time": data.fri_in,
        "fri_out_time": data.fri_out,
        "sat_in_time": data.sat_in,
        "sat_out_time": data.sat_out,
        "sun_quantity": data.sun_quan,
        "mon_quantity": data.mon_quan,
        "tue_quantity": data.tue_quan,
        "wed_quantity": data.wed_quan,
        "thu_quantity": data.thu_quant,
        "fri_quantity": data.fri_quan,
        "sat_quantity": data.sat_quan,
        "creation_date": this.getTodayFormatted(),
        "last_updated_date": this.getTodayFormatted(),
        "last_updated_by": user,
        "created_by": user,
        "crewsetup_line_id": "",
        "equipment_Id": "",
        "EquipmentName": "",
        "EquipmentClass": "",
        "per_diem_amount": "",
        "per_diem_rate": "",
        "bonus_amount": "",
        "bonus_rate": "",
        "perdiem_flag": "",
        "perdiem_quantity": "",
        "bonus_flag": "",
        "bonus_quantity": "",
        "equipment_number": "",
        "ot_threshold_limit": data.otThreshlimit,
        "data_source": "",
        "crew_date": "",
        "crew_day": "",
        "comments": "",
        "sub_pay": "",
        "rate": "",
        "timecard_balancing": "",
        "assignment_id": data.assignment_id,
        "craft_override": ""
      };
      return payload;
    }

    getTodayFormatted() {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const today = new Date();

      const day = String(today.getDate()).padStart(2, "0");
      const monthName = months[today.getMonth()];
      const year = today.getFullYear();

      return `${day}-${monthName}-${year}`;
    }

    editRowMarker(original, newrec) {
      return original === newrec;
    };

    formatDate(inputDate) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const [year, month, day] = inputDate.split("-");
      const monthName = months[parseInt(month) - 1];

      return `${day}-${monthName}-${year}`;
    }

    totalhoursCalculator(rowData) {
      // Function to convert time string (HH:MM AM/PM) into a Date object
      const convertToDate = (timeString) => {
        const date = new Date(`1970-01-01T${timeString}`);
        return date;
      };

      // Function to calculate hours worked based on in and out times
      const calculateDailyHours = (inTime, outTime) => {
        // Parse the in and out times
        const inDate = convertToDate(inTime);
        const outDate = convertToDate(outTime);

        // Calculate the difference in hours (in hours and minutes)
        const diffInMillis = outDate - inDate;
        const hoursWorked = diffInMillis / (1000 * 60 * 60); // Convert milliseconds to hours
        return hoursWorked;
      };

      let obj = {
        "active_flag": rowData.active_flag,
        "assignment_number": rowData.assignment_number,
        "bill_rate": rowData.bill_rate,
        "bonus_amount": rowData.bonus_amount,
        "contract_id": rowData.contract_id,
        "crew_week": rowData.crew_week,
        "crewsetup_id": rowData.crewsetup_id,
        "crewsetup_line_id": rowData.crewsetup_line_id,
        "customer_id": rowData.customer_id,
        "end_date": rowData.end_date,
        "equipment_category": rowData.equipment_category,
        "equipment_rate": rowData.equipment_rate,
        "fri_in_time": rowData.fri_in_time,
        "fri_out_time": rowData.fri_out_time,
        "fri_total_hours": 0,
        "mon_in_time": rowData.mon_in_time,
        "mon_out_time": rowData.mon_out_time,
        "mon_total_hours": 0,
        "ot_rate": rowData.ot_rate,
        "pay_rate": rowData.pay_rate,
        "per_diem_amount": rowData.per_diem_amount,
        "po": rowData.po,
        "po_line": rowData.po_line,
        "primary_timekeeper_id": rowData.primary_timekeeper_id,
        "project_id": rowData.project_id,
        "project_name": rowData.project_name,
        "project_number": rowData.project_number,
        "resource_location": rowData.resource_location,
        "resource_name": rowData.resource_name,
        "resource_number": rowData.resource_number,
        "resource_role": rowData.resource_role,
        "resource_type": rowData.resource_type,
        "sat_in_time": rowData.sat_in_time,
        "sat_out_time": rowData.sat_out_time,
        "sat_total_hours": 0,
        "secondary_timekeeper_id": rowData.secondary_timekeeper_id,
        "start_date": rowData.start_date,
        "sun_in_time": rowData.sun_in_time,
        "sun_out_time": rowData.sun_out_time,
        "sun_total_hours": 0,
        "supervisor": rowData.supervisor,
        "task_id": rowData.task_id,
        "task_name": rowData.task_name,
        "thu_in_time": rowData.thu_in_time,
        "thu_out_time": rowData.thu_out_time,
        "thu_total_hours": 0,
        "time_type": rowData.time_type,
        "total_hours": 0,
        "tue_in_time": rowData.tue_in_time,
        "tue_out_time": rowData.tue_out_time,
        "tue_total_hours": 0,
        "wed_in_time": rowData.wed_in_time,
        "wed_out_time": rowData.wed_out_time,
        "wed_total_hours": 0,
        "week_end_date": rowData.week_end_date,
        "week_start_date": rowData.week_start_date,
        "comments": rowData.comments,
        "totalhours": 0,
        "isRowEdited": rowData.isRowEdited,
        "crew_day": rowData.crew_day,
        "day": rowData.day,
        "iscopy": rowData.iscopy
      };

      // Calculate and set total hours for each day
      obj.mon_total_hours = calculateDailyHours(rowData.mon_in_time, rowData.mon_out_time);
      obj.tue_total_hours = calculateDailyHours(rowData.tue_in_time, rowData.tue_out_time);
      obj.wed_total_hours = calculateDailyHours(rowData.wed_in_time, rowData.wed_out_time);
      obj.thu_total_hours = calculateDailyHours(rowData.thu_in_time, rowData.thu_out_time);
      obj.fri_total_hours = calculateDailyHours(rowData.fri_in_time, rowData.fri_out_time);
      obj.sat_total_hours = calculateDailyHours(rowData.sat_in_time, rowData.sat_out_time);
      obj.sun_total_hours = calculateDailyHours(rowData.sun_in_time, rowData.sun_out_time);

      // Calculate total hours for the entire week
      obj.total_hours = obj.mon_total_hours + obj.tue_total_hours + obj.wed_total_hours + obj.thu_total_hours +
        obj.fri_total_hours + obj.sat_total_hours + obj.sun_total_hours;

      // Update the "totalhours" field with the total of the week
      obj.totalhours = obj.total_hours;

      return obj;
    }




    getmaxheaderid(mydata) {
      let data = JSON.parse(mydata);
      let crew_setup_lines_rownum = 0;
      for (let item of data) {
        if (item.crew_setup_lines_rownum > crew_setup_lines_rownum) {
          crew_setup_lines_rownum = item.crew_setup_lines_rownum;
        }
      }
      return crew_setup_lines_rownum === 0 ? 1 : crew_setup_lines_rownum + 1;
    }
    batchupdateJson(data) {
      let finalPayload = data.map(obj => {
        delete obj.isRowEdited;
        return obj;
      })
      return finalPayload;
    };

    updatejson(data) {
      const editedDate = data.filter(row => !row.isRowEdited).map(row => {
        const { isRowEdited, ...rest } = row;
        return rest;
      });
      return editedDate;
    }




    filterData(selected, data, selectedKeys, idAdd) {
      var keys = [];
      var filteredData = [];
      if (!idAdd) {
        if (selected.row.isAddAll()) {
          let iterator = selected.row.deletedValues();
          iterator.forEach(function (key) {
            keys.push(key);
          });
          filteredData = data.filter(function (obj) {
            return !keys.some(function (obj2) {
              return obj.time_entry_id === obj2;
            });
          });
        }
        else {
          filteredData = data.filter(function (obj) {
            return selectedKeys.some(function (obj2) {
              return obj.time_entry_id === obj2;
            });
          });
        }
      } else {
        if (selected.row.isAddAll()) {
          let iterator = selected.row.deletedValues();
          iterator.forEach(function (key) {
            keys.push(key);
          });
          filteredData = data.filter(function (obj) {
            return !keys.some(function (obj2) {
              return obj.crew_setup_lines_rownum === obj2;
            });
          });
        }
        else {
          filteredData = data.filter(function (obj) {
            return selectedKeys.some(function (obj2) {
              return obj.crew_setup_lines_rownum === obj2;
            });
          });
        }
      }
      return filteredData;
    };

    dateFormatter(startdate, enddate, crewDate) {

      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const t1 = new Date(startdate);
      let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate();
      const t2 = new Date(enddate);
      let t2Date = t2.getDate() >= 10 ? t2.getDate() : "0" + t2.getDate();
      let start_date = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      let end_date = t2Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      const t3 = new Date(crewDate);
      let t3Date = t3.getDate() >= 10 ? t3.getDate() : "0" + t3.getDate();
      let crew_date = t3Date + '-' + monthNames[t3.getMonth()] + '-' + t3.getFullYear();
      let sysdate = new Date();

      return { "startDate": start_date, "endDate": end_date, "sysdate": sysdate, "crewDate": crew_date };


    }
    getColumns(measure, isAdd) {
      let columns = [
        {
          "headerText": "",
          "field": "",
          "frozenEdge": "start",
          "template": "action",
          "sortable": "disabled",
          "width": 80
        }
      ];


      if (isAdd) {
        // columns.push({
        //   "headerText": "",
        //   "field": "",
        //   "frozenEdge": "start",
        //   "template": "copy",
        //   "sortable": "disabled"
        // },
        //   {
        //     "headerText": "",
        //     "field": "",
        //     "template": "del",
        //     "sortable": "disabled"
        //   });
      }

      columns.push(
        {
          "headerText": "Type",
          "field": "resource_type",
          "frozenEdge": "start",
          "classname": "oj-read-only"
        },
        {
          "headerText": "Name",
          "field": "resource_name",
          "frozenEdge": "start",
          "classname": "oj-read-only"
        },
        {
          "headerText": "Project Number",
          "field": "project_number",
          "frozenEdge": "start",
          "classname": "oj-read-only"
        },
        {
          "headerText": "Task Name",
          "field": "task_name",
          "frozenEdge": "start",
          "classname": "oj-read-only"
        },
        {
          "headerText": "Time Type",
          "field": "time_type",
          "frozenEdge": "start",
          "classname": "oj-read-only"
        },
        {
          "headerText": "Bonus Amount",
          "field": "bonus_amount",
          "classname": "oj-read-only",
          "className": "oj-helper-text-align-end"
        },
        {
          "headerText": "Perdiem Amount",
          "field": "per_diem_amount",
          "classname": "oj-read-only",
          "className": "oj-helper-text-align-end"
        },
        {
          "headerText": "Installed Qty",
          "field": "installed_qty",
          "template": "installed_qty",
          "className": "oj-helper-text-align-end"
        },
        {
          "headerText": "Craft Override",
          "field": "resource_role",
          "className": "oj-helper-text-align-end"
        }
      );

      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


      days.forEach(day => {
        if (!measure || measure === "TIME IN OUT") {

          columns.push(
            { "headerText": `${day} In Time`, "field": `${day.toLowerCase()}_in_time`, "className": "oj-helper-text-align-end" },
            { "headerText": `${day} Out Time`, "field": `${day.toLowerCase()}_out_time`, "className": "oj-helper-text-align-end" }
          );
        }
        if (!measure || measure === "TIME IN OUT" || measure === "QUANTITY") {

          columns.push(
            { "headerText": `${day} Total Hours`, "field": `${day.toLowerCase()}_total_hours`, "className": "oj-helper-text-align-end" }
          );
        }
      });

      columns.push(
        {
          "headerText": "Total Hours",
          "field": "total_hours",
          "template": "total_hours",
          "className": "oj-helper-text-align-end"
        },
        {
          "headerText": "Status",
          "field": "status"
        },
        {
          "headerText": "Log Details",
          "field": "",
          "template": "logger"
        }

      );

      return columns;
    }


    getreprocessColumns(measure, logger) {
      let columns = []


      if (!logger) {
        columns.push(
          {
            "headerText": "",
            "field": "",
            "frozenEdge": "start",
            "template": "action",
            "sortable": "disabled"
          }
        );
      }
      columns.push(
        {
          "headerText": "Name",
          "field": "resource_name",
          "frozenEdge": "start",
          "classname": "oj-read-only"
        }
      );



      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      days.forEach(day => {
        if (!measure || measure === "TIME IN OUT") {
          columns.push(
            { "headerText": `${day} In Time`, "field": `${day.toLowerCase()}_in_time`, "className": "oj-helper-text-align-end", "template": `${day.toLowerCase()}_in_time` },
            { "headerText": `${day} Out Time`, "field": `${day.toLowerCase()}_out_time`, "className": "oj-helper-text-align-end", "template": `${day.toLowerCase()}_out_time` }
          );
        }
        if (!measure || measure === "TIME IN OUT" || measure === "QUANTITY") {
          columns.push(
            { "headerText": `${day} Total Hours`, "field": `${day.toLowerCase()}_total_hours`, "className": "oj-helper-text-align-end", "template": `${day.toLowerCase()}_total_hours` }
          );
        }
      });

      columns.push(
        {
          "headerText": "Total Hours",
          "field": "total_hours",
          "className": "oj-helper-text-align-end"
        },
        {
          "headerText": "Status",
          "field": "status"
        }
      );


      return columns;
    }


    getDay(date, isadd, measure) {
      const givenDate = new Date(date);
      const dayOfWeek = givenDate.getDay();
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const myday = days[dayOfWeek];

      // Define columns template structure
      const columnTemplate = [
        { "headerText": "", "field": "", "frozenEdge": "start", "template": "action", "sortable": "disabled" },
        { "headerText": "Name", "field": "resource_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Project Number", "field": "project_number", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "Task Name", "field": "task_name", "frozenEdge": "start", "classname": "oj-read-only" },
        { "headerText": "OT Rate", "field": "ot_rate", "frozenEdge": "start", "className": "oj-helper-text-align-end" },
        { "headerText": "Status", "field": "status" }
      ];

      // Define day-specific fields
      const daySpecificColumns = {
        "Sunday": ["sun"],
        "Monday": ["mon"],
        "Tuesday": ["tue"],
        "Wednesday": ["wed"],
        "Thursday": ["thu"],
        "Friday": ["fri"],
        "Saturday": ["sat"]
      };

      // Generate day-specific columns based on measure
      let dayColumns = [];
      if (daySpecificColumns[myday]) {
        if (measure === "TIME IN OUT") {
          dayColumns = [
            { "headerText": `${myday.substr(0, 3)} In Time`, "field": `${daySpecificColumns[myday]}_in_time`, "className": "oj-helper-text-align-end" },
            { "headerText": `${myday.substr(0, 3)} Out Time`, "field": `${daySpecificColumns[myday]}_out_time`, "className": "oj-helper-text-align-end" },
            { "headerText": "Total Hours", "field": `${daySpecificColumns[myday]}_total_hours`, "className": "oj-helper-text-align-end" }
          ];
        } else if (measure === "QUANTITY") {
          dayColumns = [
            { "headerText": "Total Hours", "field": `${daySpecificColumns[myday]}_total_hours`, "className": "oj-helper-text-align-end" }
          ];
        }
      }

      // Combine column templates and day-specific columns
      let columns = [...columnTemplate, ...dayColumns];

      // If isadd is true, add the copy column if not already present
      if (isadd && !columns.some(col => col.template === "copy")) {
        columns.unshift({ "headerText": "", "field": "", "frozenEdge": "start", "template": "copy", "sortable": "disabled" });
      }

      // Create the day object
      const obj = days.reduce((acc, day) => {
        acc[day.toLowerCase()] = myday === day;
        return acc;
      }, {});

      return { dateobj: obj, columns };
    }



    payloadGenerator(data, user, startdate, endDate, daterange, crewDate, specific, weekid) {
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const t1 = new Date();
      let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate();
      let creationDate = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      let obj = {
        "action": "ADD",
        "assignment_number": data.assignment_number,
        "bill_rate": data.bill_rate,
        "crew_week": specific === "WEEK" ? daterange : "",
        "crew_date": specific === "DAY" ? crewDate : "",
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
        "week_end_date": endDate,
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
        "time_keeper_id": data.primary_timekeeper_id,
        "supervisor_id": data.supervisor,
        "secondary_timekeeper_id": data.secondary_timekeeper_id,
        "last_updated_by": user,
        "last_updated_date": creationDate,
        "week_start_date": startdate,
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

    updateAllPayloadGenerator(crewsetupid, week, date, filterArray, updateobj) {
      const timeentryweekid = filterArray.map(obj => obj.timeentry_week_id).join(',');
      const person_id = filterArray.map(obj => obj.person_id).join(',');
      let obj = {
        crewsetup_id: crewsetupid,
        crew_week: week,
        personId: person_id,
        timeentry_week_id: timeentryweekid,
        mon_in_time: updateobj.mon_in_time,
        tue_in_time: updateobj.tue_in_time,
        wed_in_time: updateobj.wed_in_time,
        thu_in_time: updateobj.thu_in_time,
        fri_in_time: updateobj.fri_in_time,
        sat_in_time: updateobj.sat_in_time,
        sun_in_time: updateobj.sun_in_time,
        mon_out_time: updateobj.mon_out_time,
        tue_out_time: updateobj.tue_out_time,
        wed_out_time: updateobj.wed_out_time,
        thu_out_time: updateobj.thu_out_time,
        fri_out_time: updateobj.fri_out_time,
        sat_out_time: updateobj.sat_out_time,
        sun_out_time: updateobj.sun_out_time,
        comments: updateobj.comments ? updateobj.comments : ""
      }

      return obj;

    }

    updateEachPayloadGenerator(crewsetupid, week, date, row, updateobj, specific, weekobj) {
      let obj;
      if (specific === "WEEK") {
        obj = {
          "person_id": row.person_id
          , "crewsetup_id": crewsetupid
          , "crewsetup_line_id": row.crewsetup_line_id
          , "crew_week": week
          , "crew_date": date
          , "timeentry_week_id": row.timeentry_week_id
          , "mon_in_time": updateobj.mon_in_time
          , "tue_in_time": updateobj.tue_in_time
          , "wed_in_time": updateobj.wed_in_time
          , "thu_in_time": updateobj.thu_in_time
          , "fri_in_time": updateobj.fri_in_time
          , "sat_in_time": updateobj.sat_in_time
          , "sun_in_time": updateobj.sun_in_time
          , "mon_out_time": updateobj.mon_out_time
          , "tue_out_time": updateobj.tue_out_time
          , "wed_out_time": updateobj.wed_out_time
          , "thu_out_time": updateobj.thu_out_time
          , "fri_out_time": updateobj.fri_out_time
          , "sat_out_time": updateobj.sat_out_time
          , "sun_out_time": updateobj.sun_out_time
          , "comments": updateobj.comments ? updateobj.comments : ""
        }
      } else if (specific === "DAY") {
        if (weekobj.mon) {
          obj = {
            "person_id": row.person_id
            , "crewsetup_id": crewsetupid
            , "crewsetup_line_id": row.crewsetup_line_id
            , "crew_week": week
            , "crew_date": date
            , "timeentry_week_id": row.timeentry_week_id
            , "mon_in_time": updateobj.mon_in_time
            , "mon_out_time": updateobj.mon_out_time
          }
        } else if (weekobj.tue) {
          obj = {
            "person_id": row.person_id
            , "crewsetup_id": crewsetupid
            , "crewsetup_line_id": row.crewsetup_line_id
            , "crew_week": week
            , "crew_date": date
            , "timeentry_week_id": row.timeentry_week_id
            , "tue_in_time": updateobj.tue_in_time
            , "tue_out_time": updateobj.tue_out_time
          }
        } else if (weekobj.wed) {
          obj = {
            "person_id": row.person_id
            , "crewsetup_id": crewsetupid
            , "crewsetup_line_id": row.crewsetup_line_id
            , "crew_week": week
            , "crew_date": date
            , "timeentry_week_id": row.timeentry_week_id
            , "wed_in_time": updateobj.wed_in_time
            , "wed_out_time": updateobj.wed_out_time
          }
        } else if (weekobj.thu) {
          obj = {
            "person_id": row.person_id
            , "crewsetup_id": crewsetupid
            , "crewsetup_line_id": row.crewsetup_line_id
            , "crew_week": week
            , "crew_date": date
            , "timeentry_week_id": row.timeentry_week_id
            , "thu_in_time": updateobj.thu_in_time
            , "thu_out_time": updateobj.thu_out_time
          }
        } else if (weekobj.fri) {
          obj = {
            "person_id": row.person_id
            , "crewsetup_id": crewsetupid
            , "crewsetup_line_id": row.crewsetup_line_id
            , "crew_week": week
            , "crew_date": date
            , "timeentry_week_id": row.timeentry_week_id
            , "fri_in_time": updateobj.fri_in_time
            , "fri_out_time": updateobj.fri_out_time
          }
        } else if (weekobj.sat) {
          obj = {
            "person_id": row.person_id
            , "crewsetup_id": crewsetupid
            , "crewsetup_line_id": row.crewsetup_line_id
            , "crew_week": week
            , "crew_date": date
            , "timeentry_week_id": row.timeentry_week_id
            , "sat_in_time": updateobj.sat_in_time
            , "sat_out_time": updateobj.sat_out_time
          }
        } else if (weekobj.sun) {
          obj = {
            "person_id": row.person_id
            , "crewsetup_id": crewsetupid
            , "crewsetup_line_id": row.crewsetup_line_id
            , "crew_week": week
            , "crew_date": date
            , "timeentry_week_id": row.timeentry_week_id
            , "sun_in_time": updateobj.sun_in_time
            , "sun_out_time": updateobj.sun_out_time
          }
        }

      } else {
        obj = {};
      }


      return obj;

    }

    createPayload(selRows, otObj) {
      let array = [];
      selRows.forEach(element => {
        Object.assign(element, otObj);
        array.push(element);
      });
      console.log("array-s", array);
      return array;
    }



  }

  return PageModule;
});
