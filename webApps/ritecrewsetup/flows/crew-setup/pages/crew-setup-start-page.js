define([], () => {
  'use strict';

  class PageModule {

    getISODate(date) {
      return new Date(date);
    }

    saveCombinationData(data, user, crew) {
      let payload = {
        "p_crewsetup_id": crew.crewsetup_id,
        "p_crew_name": crew.crew_name,
        "p_combination_id": "",
        "p_combination_name": data.combination_name,
        "p_project": data.project,
        // "p_task_date": "",
        "p_shift": data.shift,
        "p_location_tax_jurisdiction": data.location_tax_jurisdiction,
        "p_work_package": data.work_package,
        "p_department": data.department,
        "p_cost_category": data.cost_category,
        "p_time_type": data.time_type,
        "p_hours": data.hours,
        "p_task_name": data.task_name,
        "p_task_number": data.task_number,
        "p_task_id": data.task_id,
        "p_project_number": data.project_number,
        "p_project_id": data.project_id,
        "p_actions": "",
        "p_attribute1": "",
        "p_attribute2": "",
        "p_attribute3": "",
        "p_attribute4": "",
        "p_attribute5": "",
        "p_attribute6": "",
        "p_attribute7": "",
        "p_attribute8": "",
        "p_attribute9": "",
        "p_attribute10": "",
        "p_created_by": user,
        "p_last_updated_by": user
      }

      return payload;
    }



    areAllItemsPresent(data, crew) {
      return data.some(item => item.crew_name === crew);
    }



    getuniqueResource(data) {
      // debugger;
      let uniqarray = [];
      let isExist = [];
      if (data) {
        data.forEach((itm) => {
          if (isExist.length == 0) {
            isExist.push(itm.resource_number);
            uniqarray.push(itm);
          }
          else if (isExist.indexOf(itm.resource_number) == -1) {
            isExist.push(itm.resource_number);
            itm.resource_name_label = itm.resource_name + "-" + itm.resource_number;
            // itm.resource_name = itm.resource_name;
            uniqarray.push(itm);
          }
        });
      }
      return uniqarray;

    }

    startEditing(rowKey) {
      this.rowBeingEditted = rowKey;
      let self = this;
      this.editInProgressPromise = new Promise((resolve, reject) => {
        self.resolveHandler = resolve;

      });
    }

    endEditing(rowKey) {
      if (rowKey !== this.rowBeingEditted) {
        // the nature of events is that editing multiple rows in one go will
        // cause multiple calls to startEditing and endEditing and it is important
        // to ignore endEditing if it is NOT for row being currently edited - such
        // event can be safely ignored here
        return;
      }
      if (this.resolveHandler) {
        this.resolveHandler();
      }
    }

    isEditingFinished() {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject(), 500);
        this.editInProgressPromise.then(() => resolve());
      });
    }

    dayValuesDefault(startDate, endDate) {
      let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let start = new Date(startDate);
      let end = new Date(endDate);

      let myobj = {
        startDay: dayNames[start.getDay()],
        endDay: dayNames[end.getDay()]
      };
      return myobj;
    }

    getDaysOfWeek(startDay, endDay) {
      const daysOfWeek = {
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
      };

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const startIndex = days.indexOf(startDay);
      const endIndex = days.indexOf(endDay);

      for (let i = startIndex; i <= endIndex; i++) {
        daysOfWeek[days[i]] = true;
      }

      return daysOfWeek;
    }

    dateFormatter(startdate, enddate, headStart, headEnd) {
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const t1 = new Date(startdate);

      let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate();
      const t2 = new Date(enddate);
      let t2Date = t2.getDate() >= 10 ? t2.getDate() : "0" + t2.getDate();
      let start_date = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      let end_date = t2Date + '-' + monthNames[t2.getMonth()] + '-' + t2.getFullYear();
      let sysdate = new Date();
      let t3Date = sysdate.getDate() > 10 ? sysdate.getDate() : "0" + sysdate.getDate();
      let currentdate = t3Date + '-' + monthNames[sysdate.getMonth()] + '-' + sysdate.getFullYear();

      const h1 = new Date(headStart);
      let h1Date = h1.getDate() >= 10 ? h1.getDate() : "0" + h1.getDate();
      const h2 = new Date(headEnd);
      let h2Date = h2.getDate() >= 10 ? h2.getDate() : "0" + h2.getDate();
      let h_start_date = h1Date + '-' + monthNames[h1.getMonth()] + '-' + h1.getFullYear();
      let h_end_date = h2Date + '-' + monthNames[h2.getMonth()] + '-' + h2.getFullYear();
      return { "startDate": start_date, "endDate": end_date, "sysdate": currentdate, "hstart": h_start_date, "hend": h_end_date };

    }




    effectiveDate(date) {
      const currentDate = new Date(date);
      currentDate.setDate(currentDate.getDate());
      const isoString = currentDate.toISOString();
      let mydate = isoString.substring(0, 10);
      return mydate;
    }

    getUniqueDayNamesBetweenDatesNew(startDate, myendDate) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let currentDate = new Date(startDate);
      let endDate = new Date(myendDate);
      const result = {};
      while (currentDate <= endDate) {
        const dayName = daysOfWeek[currentDate.getDay()];
        result[dayName] = true;
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return result;
    }

    printLog(arg) {

      console.log("TESTLOG", arg);
    }

    parseDateString(dateString) {
      let parts = dateString.split('-');
      return new Date(parts[2], parts[1], parts[0]);
      //return `${parts[2]}-${parts[1] - 1}-${parts[0]}`;
      // let monthIndex = dateString.getMonth();
      // let year = dateString.getFullYear();
      // let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","Sep", "Oct", "Nov", "Dec"];
      // let month = monthNames[monthIndex];
      // return `${day}-${month}-${year}`;
    }
    updateCrew(data) {
      // debugger;
      let payload = {
        "p_crew_scope": data.crew_scope,
        "p_time_entry_method": data.time_entry_method,
        "p_primary_timekeeper_id": data.primary_timekeeper_id,
        "p_secondary_timekeeper_id": data.secondary_timekeeper_id,
        "p_supervisor": data.supervisor_name,
        "p_start_date": data.start_date,
        "p_end_date": data.end_date,
        "p_crew_start_week": data.crew_start_week,
        "p_crew_end_week": data.crew_end_week,
        "p_customer_name": data.customer_name,
        "p_contract_number": data.contract_number,
        "p_customer_id": data.customer_id,
        "p_contract_id": data.customer_id,
        "p_project_id": data.project_id,
        "p_crew_specific": data.crew_specific
      };
      return payload;
    }
    createAddEquipPayload(equipObj, startDate, endDate, effStart, effEnd) {

      let addEqpObj = { ...equipObj };
      let finalObj = {
        "p_non_labour_resource": addEqpObj.non_labour_resource,
        "p_crewsetup_id": addEqpObj.crewsetup_id,
        "p_crew_name": addEqpObj.crew_name,
        "p_project_id": addEqpObj.project_id,
        "p_project_number": addEqpObj.project_number,
        "p_project_name": addEqpObj.project_name,
        "p_task_id": addEqpObj.task_id,
        "p_task_name": addEqpObj.task_name,
        "p_task_number": addEqpObj.task_number,
        "p_equipment_class": addEqpObj.EquipmentClass,
        "p_equipment_number": addEqpObj.resource_number,
        "p_equipment_id": addEqpObj.equipment_Id,
        "p_equipment_name": addEqpObj.EquipmentName,
        "p_equipment_location": addEqpObj.resource_location,
        "p_bill_rate": addEqpObj.bill_rate,
        "p_cost_rate": addEqpObj.pay_rate,
        "p_active_flag": addEqpObj.active_flag !== undefined ? addEqpObj.active_flag : null,
        "p_crew_day": null,
        "p_sun_in_time": addEqpObj.sun_in_time,
        "p_sun_out_time": addEqpObj.sun_out_time,
        "p_effective_start_date": effStart,
        "p_effective_end_date": effEnd,
        "p_crew_week": null,
        "p_time_entry_mode": addEqpObj.time_entry_mode !== undefined ? addEqpObj.time_entry_mode : null,
        "p_mon_in_time": addEqpObj.mon_in_time,
        "p_mon_out_time": addEqpObj.mon_out_time,
        "p_tue_in_time": addEqpObj.tue_in_time,
        "p_tue_out_time": addEqpObj.tue_out_time,
        "p_wed_in_time": addEqpObj.wed_in_time,
        "p_wed_out_time": addEqpObj.wed_out_time,
        "p_thu_in_time": addEqpObj.thu_in_time,
        "p_thu_out_time": addEqpObj.thu_out_time,
        "p_fri_in_time": addEqpObj.fri_in_time,
        "p_fri_out_time": addEqpObj.fri_out_time,
        "p_sat_in_time": addEqpObj.sat_in_time,
        "p_sat_out_time": addEqpObj.sat_out_time,
        "p_week_start_date": null,
        "p_week_end_date": null,
        "p_assignment_number": addEqpObj.assignment_number !== undefined ? addEqpObj.assignment_number : null,
        "p_sun_total_hours": addEqpObj.sun_total_hours === undefined ? addEqpObj.sun_quantity : addEqpObj.sun_total_hours,
        "p_mon_total_hours": addEqpObj.mon_total_hours === undefined ? addEqpObj.mon_quantity : addEqpObj.mon_total_hours,
        "p_tue_total_hours": addEqpObj.tue_total_hours === undefined ? addEqpObj.tue_quantity : addEqpObj.tue_total_hours,
        "p_wed_total_hours": addEqpObj.wed_total_hours === undefined ? addEqpObj.wed_quantity : addEqpObj.wed_total_hours,
        "p_thu_total_hours": addEqpObj.thu_total_hours === undefined ? addEqpObj.thu_quantity : addEqpObj.thu_total_hours,
        "p_fri_total_hours": addEqpObj.fri_total_hours === undefined ? addEqpObj.fri_quantity : addEqpObj.fri_total_hours,
        "p_sat_total_hours": addEqpObj.sat_total_hours === undefined ? addEqpObj.sat_quantity : addEqpObj.sat_total_hours,
        "p_total_hours": null,
        "p_po": addEqpObj.po !== undefined ? addEqpObj.po : null,
        "p_po_line": addEqpObj.po_line !== undefined ? addEqpObj.po_line : null,
        "p_approver_comments": null,
        "p_customer_id": addEqpObj.customer_id,
        "p_contract_id": addEqpObj.contract_id,
        "p_start_date": startDate,
        "p_end_date": endDate,
        "p_project_assigned": addEqpObj.project_assigned,
        "p_project_role": null,
        "p_expenditure_type_id": addEqpObj.expenditure_type_id,
        "p_expenditure_type_name": addEqpObj.expenditure_type_name,
        "p_location": null,
        "p_city": null,
        "p_country": null,
        "p_addressline1": null,
        "p_addressline2": null,
        "p_postalcode": null,
        "p_latitude": null,
        "p_longitude": null,
        "p_created_by": null,
        "p_last_updated_by": null,
        "p_last_update_login": null
      };
      console.log("TESTLOG", finalObj);
      return finalObj;

    }



    createPostPayload(linesObj, dialogueLabel, headerObj, email) {
      // Helper function to format the date
      const formatDate = (mydate) => {
        let date = new Date(mydate);
        const day = String(date.getDate()).padStart(2, '0');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

      const sysdate = formatDate(new Date());
      //debugger;
      // Construct the payload object
      let payload = {
        // Header properties
        crewsetup_id: headerObj.crewsetup_id,
        contract_id: headerObj.contract_id,
        customer_id: headerObj.customer_id,

        // Lines properties
        fri_in_time: linesObj.fri_in_time,
        fri_out_time: linesObj.fri_out_time,
        mon_in_time: linesObj.mon_in_time,
        mon_out_time: linesObj.mon_out_time,
        sat_in_time: linesObj.sat_in_time,
        sat_out_time: linesObj.sat_out_time,
        sun_in_time: linesObj.sun_in_time,
        sun_out_time: linesObj.sun_out_time,
        thu_in_time: linesObj.thu_in_time,
        thu_out_time: linesObj.thu_out_time,
        tue_in_time: linesObj.tue_in_time,
        tue_out_time: linesObj.tue_out_time,
        wed_in_time: linesObj.wed_in_time,
        wed_out_time: linesObj.wed_out_time,

        sun_quantity: linesObj.sun_quantity,
        mon_quantity: linesObj.mon_quantity,
        tue_quantity: linesObj.tue_quantity,
        wed_quantity: linesObj.wed_quantity,
        thu_quantity: linesObj.thu_quantity,
        fri_quantity: linesObj.fri_quantity,
        sat_quantity: linesObj.sat_quantity,

        project_id: linesObj.project_id,
        project_number: linesObj.project_number,
        per_diem_amount: linesObj.perdiem_flag === true ? linesObj.per_diem_amount : 0,
        per_diem_rate: linesObj.per_diem_rate,
        bonus_amount: linesObj.bonus_flag === true ? linesObj.bonus_amount : 0,
        bonus_rate: linesObj.bonus_rate,
        resource_number: linesObj.resource_number,
        resource_id: linesObj.resource_id,
        resource_location: linesObj.resource_location,
        resource_name: linesObj.resource_name,
        resource_role: linesObj.resource_role,
        task_id: linesObj.task_id,
        task_name: linesObj.task_name,
        task_number: linesObj.task_number,
        expenditure_type_id: linesObj.expenditure_type_id ? linesObj.expenditure_type_id : '',
        expenditure_type_name: linesObj.expenditure_type_name ? linesObj.expenditure_type_name : '',
        project_assigned: linesObj.project_assigned,
        project_name: linesObj.project_name,
        equipment_Id: linesObj.equipment_Id,
        EquipmentClass: linesObj.equpclass,
        EquipmentName: linesObj.EquipmentName,
        equipment_number: linesObj.equipment_number,
        perdiem_flag: linesObj.perdiem_flag,
        perdiem_quantity: linesObj.perdiem_flag === true ? linesObj.perdiem_quantity : 0,
        bonus_flag: linesObj.bonus_flag,
        bonus_quantity: linesObj.bonus_flag === true ? linesObj.bonus_quantity : 0,

        // Static values
        resource_type: 'EMPLOYEE',
        time_entry_mode: 'CREATE',
        po: '',
        po_line: '',
        active_flag: 'Y',
        last_updated_by: email,
        last_updated_date: sysdate,
        ot_threshold_limit: linesObj.ot_threshold_limit,
        assignment_id: linesObj.assignment_id,
        craft_override: linesObj.craft_override,


        // Dynamic fields based on dialogueLabel
        created_by: dialogueLabel === 'Edit' ? linesObj.created_by : email,
        creation_date: dialogueLabel === 'Edit' ? linesObj.creation_date : sysdate,
        crewsetup_line_id: dialogueLabel === 'Edit' ? linesObj.crewsetup_line_id : null,

        // Date fields from dateFormat
        effective_end_date: formatDate(linesObj.effective_end_date_copy),
        effective_start_date: formatDate(linesObj.effective_start_date_copy),
        end_date: formatDate(headerObj.end_date),
        start_date: formatDate(headerObj.start_date),
        assignment_number: linesObj.assignment_number ? linesObj.assignment_number : '',
        equipment_category: linesObj.equipment_category ? linesObj.equipment_category : '',
        equipment_rate: linesObj.equipment_rate ? linesObj.equipment_rate : '',
        bill_rate: linesObj.bill_rate ? linesObj.bill_rate : '',
        pay_rate: linesObj.pay_rate ? linesObj.pay_rate : '',
        ot_rate: linesObj.ot_rate ? linesObj.ot_rate : '',
        data_source: linesObj.data_source ? linesObj.data_source : '',
        crew_date: linesObj.crew_date ? linesObj.crew_date : '',
        crew_day: linesObj.crew_day ? linesObj.crew_day : '',
        comments: linesObj.comments ? linesObj.comments : '',
        sub_pay: linesObj.sub_pay ? linesObj.sub_pay : '',
        rate: linesObj.rate ? linesObj.rate : '',
        timecard_balancing: linesObj.timecard_balancing ? linesObj.timecard_balancing : ''

      };

      return payload;
    }

    getassignVaribales() {
      let obj = {
        "crewMeasure": {
          "data": [
            {
              "value": "TIME IN OUT"
            },
            {
              "value": "QUANTITY"
            }
          ]
        },
        "crewscope": {
          "data": [
            {
              "scope": "CUSTOMER"
            },
            {
              "scope": "CONTRACT"
            },
            {
              "scope": "PROJECT"
            }
          ]
        },
        "timeentry": {
          "data": [
            {
              "method": "ONLINE"
            },
            {
              "method": "OFFLINE"
            }
          ]
        },
        "weekdays": {
          "data": [
            {
              "day": "Monday"
            },
            {
              "day": "Tuesday"
            },
            {
              "day": "Wednesday"
            },
            {
              "day": "Thursday"
            },
            {
              "day": "Friday"
            },
            {
              "day": "Saturday"
            },
            {
              "day": "Sunday"
            }
          ]
        },
        "crewspecific": {
          "data": [
            {
              "value": "YES"
            },
            {
              "value": "NO"
            }
          ]
        },
        "crewttype": {
          "data": [
            {
              "type": "PERSON"
            },
            {
              "type": "EQUIPMENT"
            },
            {
              "type": "BOTH"
            }
          ]
        }
      };
      return obj;
    }
    validateMonday() {
      return [
        {
          validate: (mytime) => {
            let enteredTime = mytime;
            return this.validateTimeOut(
              mytime,
              document.getElementById('monin').value
            );

          }
        }
      ];
    };
    validateTuesday() {
      return [
        {
          validate: (mytime) => {
            let enteredTime = mytime;
            return this.validateTimeOut(
              mytime,
              document.getElementById('tuein').value
            );

          }
        }
      ];
    };
    validateWedday() {
      return [
        {
          validate: (mytime) => {
            let enteredTime = mytime;
            return this.validateTimeOut(
              mytime,
              document.getElementById('wedin').value
            );
          }
        }
      ];
    };
    validateThurday() {
      return [
        {
          validate: (mytime) => {
            let enteredTime = mytime;
            return this.validateTimeOut(
              mytime,
              document.getElementById('thuin').value
            );
          }
        }
      ];
    };
    validateFriday() {
      return [
        {
          validate: (mytime) => {
            let enteredTime = mytime;
            return this.validateTimeOut(
              mytime,
              document.getElementById('friin').value
            );
          }
        }
      ];
    };
    validateSatday() {
      return [
        {
          validate: (mytime) => {
            let enteredTime = mytime;
            return this.validateTimeOut(
              mytime,
              document.getElementById('satin').value
            );
          }
        }
      ];
    };
    validateSunday() {
      return [
        {
          validate: (mytime) => {
            let enteredTime = mytime;
            return this.validateTimeOut(
              mytime,
              document.getElementById('sunin').value
            );
          }
        }
      ];
    };


  };


  PageModule.prototype.getContractNumbers = function (data) {
    if (data) {
      //debugger;
      let obj = { body: { items: [] } };
      let uniqCust = [];
      data.items.forEach((itm) => {
        if (uniqCust.indexOf(itm.contract_number) === -1) {
          uniqCust.push(itm.contract_number);
          obj.body.items.push(itm);
        }
      });
      return obj;
    }
  };
  PageModule.prototype.getCustomerNames = function (data) {
    if (data) {
      debugger;
      let obj = { body: { items: [] } };
      let uniqCust = [];
      data.items.forEach((itm) => {
        if (uniqCust.indexOf(itm.customer_name) === -1) {
          uniqCust.push(itm.customer_name);
          obj.body.items.push(itm);
        }
      });
      return obj;
    }
  };
  PageModule.prototype.getPersonName = function (data, pid) {
    if (!data) return;

    for (let itm of data) {
      if (itm.person_id == pid) {
        return itm.person_name;
      }
    }
  };

  PageModule.prototype.validateTimeOut = function (outValue, inValue) {
    if (!inValue || !outValue) return true;
    let enteredTime = outValue;
    function toMinutes(t) {
      const [h, m] = t.split(":");
      return (+h) * 60 + (+m);
    }
    if (toMinutes(outValue) <= toMinutes(inValue)) {
      throw new Error("Time Out must be greater than Time In.");
    }
    if (enteredTime === null || String(enteredTime) === "") {
      throw new Error("This is a mandatory field.");
    }
    let validValue = true;
    let pattern = /^(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/;
    let matchArray1 = enteredTime.match(pattern);

    if (matchArray1 === null) {
      enteredTime = "";
      validValue = false;
      throw new Error("Enter time in (HH:MM) format.");
    }
    let matchArray = enteredTime.split(":");
    let hour = matchArray[0];
    let minute = matchArray[1];

    if (hour < 0 || hour > 24 || hour.toString().length !== 2) {
      enteredTime = "";
      validValue = false;
      throw new Error("Hours should be  between 01 and 24.");
    }
    if (minute < 0 || minute > 59 || minute.toString().length !== 2) {
      enteredTime = "";
      validValue = false;
      throw new Error("Minutes should be  between 00 and 59.");
    }
    return true;
  };






  return PageModule;
});
