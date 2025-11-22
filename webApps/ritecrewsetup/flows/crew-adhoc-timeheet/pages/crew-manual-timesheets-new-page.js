define(['xlsx'], (XLSX) => {
  'use strict';

  class PageModule {

    getuniqueResource(mydata) {

      let data = JSON.parse(mydata);
      let uniqarray = [];
      let isExist = [];
      if (data) {
        data.forEach((itm) => {
          if (isExist.length == 0) {
            isExist.push(itm.person_number);
            uniqarray.push(itm);
          }
          else if (isExist.indexOf(itm.person_number) == -1) {
            isExist.push(itm.person_number);
            itm.resource_name_label = itm.person_name + "-" + itm.person_number;
            itm.resource_name = itm.person_name;
            uniqarray.push(itm);
          }
        });
      }
      return uniqarray;

    }


    filterData(selected, data, selectedKeys) {
      let keys = [];
      let filteredData = [];
      if (selected.row.isAddAll()) {
        let iterator = selected.row.deletedValues();
        iterator.forEach(function (key) {
          keys.push(key);
        });
        filteredData = data.filter(function (obj) {
          return !keys.some(function (obj2) {
            return obj.id === obj2;
          });
        });
      }
      else {
        filteredData = data.filter(function (obj) {
          return selectedKeys.some(function (obj2) {
            return obj.id === obj2;
          });
        });
      }
      return filteredData;
    };


    formatDate(mydate) {
      let date = new Date(mydate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }


    getMaxIdForBatch(mydata) {
      let data = JSON.parse(mydata);
      let maxId = Math.max(...data.map(item => item.id), 0); // Get max id, default to 0 if empty
      return maxId + 1; // Return next available ID
    }

    getOrderById(mydata) {
      let data = JSON.parse(mydata);
      return data.sort((a, b) => b.id - a.id); // Sort by id in descending order
    }

    // {
    //   headerText: '',fdate
    //   field: '',
    //   template: 'copy',
    //   sortable: 'disabled'
    // },

    columnsGenerator(headerParams, taskdata) {
      let array = [
        {
          headerText: '',
          field: '',
          template: 'icon',
          sortable: 'disabled'
        },

        {
          headerText: 'Type',
          field: 'type',
        },
        {
          headerText: 'Crew Name',
          field: 'crew_name',
        },
        {
          headerText: 'Date',
          field: 'crew_date',
          template: 'date',
        },
        {
          headerText: 'Number',
          field: 'resource_number'
        },
        {
          headerText: 'Name',
          field: 'resource_name',
        },
        {
          headerText: 'Job',
          field: 'resource_job',
        },
        {
          headerText: 'Job Title Override',
          field: 'resource_role',
        },
        {
          headerText: 'Project Name',
          field: 'project_name',
        },
        {
          headerText: 'In Time',
          field: 'in_time',
          template: 'time',
          className: "oj-helper-text-align-end"
        },
        {
          headerText: 'Per Diem Rate',
          field: 'per_deim_rate',
          className: "oj-helper-text-align-end"
        },
        {
          headerText: 'Per Diem Amount',
          field: 'per_deim_amount',
          className: "oj-helper-text-align-end"
        },
        {
          headerText: 'Time Type',
          field: 'time_type'
        }
        // ,
        // {
        //   headerText: 'Project Location',
        //   field: 'work_location',
        // }
      ];

      if (Array.isArray(taskdata) && taskdata.length > 0) {
        // Add up to 4 records from taskdata
        taskdata.slice(0, 4).forEach((task, index) => {
          array.push({
            headerText: `${task.name}`, // Dynamically naming tasks
            field: `task${index + 1}_hours` // task1_hours, task2_hours, etc.
          });
        });
      }

      return array;
    }
    createAdhocUITableADP(empRes, headerObj, taskdata, equiprest, newresource) {
      if (newresource.resource_name) {
        empRes.push({
          team_member_name: newresource.resource_name,
          team_member_number: newresource.resource_number,
          project_role: newresource.resource_job,
          person_id: newresource.resource_id


          // "person_id": 300001695140406,
          // "person_number": "60221",
          // "person_name": "1 EMP",
          // "person_job": null,
          // "person_location": null,
          // "email_address": null
        });
      }

      let finalArr = [];
      let equpArr = [];
      let uniqueId = 1;

      empRes.forEach((ele) => {
        let objTemp = {
          id: uniqueId++,
          type: "Employee",
          project_name: headerObj.projectName,
          project_id: headerObj.projectId,
          project_number: headerObj.projectNumber,
          crew_name: headerObj.crewName,
          crewsetup_id: headerObj.crewId,
          resource_name: ele.team_member_name,
          resource_number: ele.team_member_number,
          resource_job: ele.project_role,
          resource_role: ele.project_role,
          person_id: ele.person_id,
          crew_date: this.formatDate(headerObj.date),
          in_time: headerObj.time,
          per_deim_amount: headerObj.per_deim_amount,
          per_deim_rate: headerObj.per_deim_rate,
          time_type: headerObj.timetype
        };

        if (Array.isArray(taskdata) && taskdata.length > 0) {
          taskdata.slice(0, 4).forEach((task, taskIndex) => {
            objTemp[`task_id_${taskIndex + 1}`] = task.id;
            objTemp[`task_name_${taskIndex + 1}`] = task.name;
            objTemp[`task_number_${taskIndex + 1}`] = task.number;
            objTemp[`task${taskIndex + 1}_hours`] = task.hours;
          });
        }

        finalArr.push(objTemp);
      });

      if (!headerObj.equipName) {
        equiprest.forEach((ele) => {
          let objTemp = {
            id: uniqueId++,
            type: "Equipment",
            project_name: headerObj.projectName,
            project_id: headerObj.projectId,
            project_number: headerObj.projectNumber,
            crew_name: headerObj.crewName,
            resource_name: ele.lkpvalue,
            resource_number: ele.equipment_number,
            crewsetup_id: headerObj.crewId,
            crew_date: this.formatDate(headerObj.date),
            in_time: headerObj.time,
            per_deim_amount: headerObj.per_deim_amount,
            per_deim_rate: headerObj.per_deim_rate,
            time_type: headerObj.timetype
          };

          if (Array.isArray(taskdata) && taskdata.length > 0) {
            taskdata.slice(0, 4).forEach((task, taskIndex) => {
              objTemp[`task_id_${taskIndex + 1}`] = task.id;
              objTemp[`task_name_${taskIndex + 1}`] = task.name;
              objTemp[`task_number_${taskIndex + 1}`] = task.number;
              objTemp[`task${taskIndex + 1}_hours`] = task.hours;
            });
          }
          equpArr.push(objTemp);
        });
      } else {
        let objTemp = {
          id: uniqueId++,
          type: "Equipment",
          project_name: headerObj.projectName,
          project_id: headerObj.projectId,
          project_number: headerObj.projectNumber,
          crew_name: headerObj.crewName,
          crewsetup_id: headerObj.crewId,
          resource_name: headerObj.equipName,
          resource_number: headerObj.equipment_number,
          crew_date: this.formatDate(headerObj.date),
          in_time: headerObj.time,
          per_deim_amount: headerObj.per_deim_amount,
          per_deim_rate: headerObj.per_deim_rate,
          time_type: headerObj.timetype
        };

        if (Array.isArray(taskdata) && taskdata.length > 0) {
          taskdata.slice(0, 4).forEach((task, taskIndex) => {
            objTemp[`task_id_${taskIndex + 1}`] = task.id;
            objTemp[`task_name_${taskIndex + 1}`] = task.name;
            objTemp[`task_number_${taskIndex + 1}`] = task.number;
            objTemp[`task${taskIndex + 1}_hours`] = task.hours;
          });
        }

        equpArr.push(objTemp);
      }

      finalArr = finalArr.concat(equpArr);
      finalArr.sort((a, b) => b.id - a.id);
      return finalArr;
    }



    lovGenerator(data) {
      const projectsMap = new Map();
      const tasksMap = new Map();
      // const uniqueValues = data
      //   .filter((value, index, self) =>
      //     index === self.findIndex((t) => (
      //       t.project_name === value.project_name
      //     ))
      //   );
      data.forEach(item => {
        const projectKey = item.project_name;
        if (!projectsMap.has(projectKey)) {
          projectsMap.set(projectKey, {
            projec_number: item.projec_number,
            project_id: item.project_id,
            project_name: item.project_name
          });
        }

      });
      // console.log(uniqueValues)
      return {
        projectNames: Array.from(projectsMap.values())
        // taskNames: Array.from(tasksMap.values())
      };
    }



    tasksGenerator(mydata) {
      let data = JSON.parse(mydata);
      const tasksMap = new Map();
      data.forEach(item => {
        const taskKey = item.task_name;
        if (!tasksMap.has(taskKey)) {
          tasksMap.set(taskKey, {
            task_id: item.task_id,
            task_name: item.task_name,
            task_number: item.task_number
          });
        }
      });
      return {

        taskNames: Array.from(tasksMap.values())
      };
    }

    excelProcessor(fileSet) {
      return new Promise(function (resolve, reject) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(fileSet);
        fileReader.onload = (event) => {
          let data = event.target.result;
          let workbook = XLSX.read(data, { type: "binary" });
          workbook.SheetNames.forEach(sheet => {
            if (sheet == 'Sheet1') {
              let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
              console.log(rowObject);
              resolve(rowObject);
            }
          });
        };
      });
    }

    updatedRows(key, adpData) {
      console.log("key-sheru", key);
      let array = [];
      let object = adpData.find(obj => obj.id === key);
      array.push(object);
      return array;
    }

    selectedRows(key, myadpData, myselected) {
      let adpData = JSON.parse(myadpData);
      let selected = JSON.parse(myselected);
      let array = [];
      if (selected.row.keys.all === false) {
        for (let i = 0; i < key.length; i++) {
          adpData.forEach(element => {
            let obj = {};
            if (element.id === key[i]) {
              obj = element;
              array.push(obj);
            }
          });
        }
        return array;
      } else if (selected.row.keys.all === true && selected.row.keys.deletedKeys.size > 0) {
        let updatedArry = [...adpData];
        let deltKeys = Array.from(selected.row.keys.deletedKeys.values());
        for (let i = 0; i < deltKeys.length; i++) {
          let ind = updatedArry.findIndex(row => row.id === deltKeys[i]);
          updatedArry.splice(ind, 1);
        }
        return updatedArry;
      } else if (selected.row.keys.all === true && selected.row.keys.deletedKeys.size === 0) {
        return adpData;
      }
    }


    filterColumns(columnsArr) {
      let finalArr = [];
      console.log("TESTGG", columnsArr);
      finalArr = columnsArr.filter(item => {
        item.headerText.includes('Hours');
        // if(item.headerText.contains('Hours')){
        //   finalArr.push(item);
        // }
      });
      console.log("TESTGG", finalArr);
      return finalArr;
    }

    printOutput(arg1) {
      console.log(arg1, "TESTDATA");
    }

    payloadGenerator(data, user, startdate, endDate, daterange, mycrewDate, header, weekid, taskdata) {
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const t1 = new Date();
      let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate();
      let creationDate = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      const t2 = new Date(mycrewDate);
      let t2Date = t2.getDate() >= 10 ? t2.getDate() : "0" + t2.getDate();
      let crewDate = t2Date + '-' + monthNames[t2.getMonth()] + '-' + t2.getFullYear();
      let dateObj = new Date(crewDate);
      let currentday = isNaN(dateObj) ? "Invalid Date" : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dateObj.getDay()];
      let dayOfWeek = t2.getDay();
      let diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      let weekStartDate = new Date(t2);
      weekStartDate.setDate(t2.getDate() + diffToMonday);
      let weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);
      let formattedWeekStartDate = weekStartDate.getDate().toString().padStart(2, '0') + '-' + monthNames[weekStartDate.getMonth()] + '-' + weekStartDate.getFullYear();
      let formattedWeekEndDate = weekEndDate.getDate().toString().padStart(2, '0') + '-' + monthNames[weekEndDate.getMonth()] + '-' + weekEndDate.getFullYear();
      function calculateOutTime(inTime, hours) {
        let [inHours, inMinutes] = inTime.split(":").map(Number);
        let totalMinutes = inHours * 60 + inMinutes + hours * 60;
        let outHours = Math.floor(totalMinutes / 60) % 24;
        let outMinutes = totalMinutes % 60;
        return `${outHours.toString().padStart(2, "0")}:${outMinutes.toString().padStart(2, "0")}`;
      }


      let obj = {
        "action": "ADD",
        "assignment_number": data.assignment_number,
        "bill_rate": null,
        "crew_week": formattedWeekStartDate + " to " + formattedWeekEndDate,
        "crew_date": crewDate,
        "crewsetup_line_id": weekid,
        "crewsetup_id": header.crewId,
        "crew_name": header.crewName,
        "equipment_category": null,
        "equipment_rate": null,
        "time_entry_mode": "CREATE",
        "start_time": null,
        "status": "SUBMITTED",
        "source": "MANUAL_TIME_ENTRY_FLOW",
        "stop_time": null,
        "uom": "Hours",
        "week_end_date": formattedWeekEndDate,
        "week_start_date": formattedWeekStartDate,
        "timesheet_week_id": weekid,
        "work_location": null,
        "work_schedule": "REGULAR",
        "contract_id": null,
        "created_by": user,
        "last_updated_by": user,
        "last_updated_date": creationDate,
        "creation_date": creationDate,
        "resource_name": data.resource_name,
        "resource_role": data.resource_role,
        "person_id": data.resource_number,
        "supervisor_id": null,
        "time_keeper_id": user,
        "secondary_timekeeper_id": null,
        "pay_rate": null,
        "ot_rate": null,
        "project_id": data.project_id,
        "project_number": data.project_number,
        "project_name": data.project_name,
        "task_id": taskdata.id,
        "task_name": taskdata.name,
        "task_number": taskdata.number,
        "total_hours": taskdata.hours,
        "po": null,
        "po_line": null,
        "customer_id": null,
        "perdiem_flag": "Y",
        "perdiem_quantity": null,
        "per_diem_rate": data.per_deim_rate,
        "per_diem_amount": header.per_deim_amount,
        "bonus_flag": null,
        "bonus_quantity": null,
        "bonus_rate": null,
        "bonus_amount": null,
        "resource_type": "EMPLOYEE",
        "time_type": header.time_type
      };

      ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].forEach((day, index) => {
        if (currentday === ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][index]) {
          obj[`${day}_in_time`] = data.in_time;
          obj[`${day}_out_time`] = calculateOutTime(data.in_time, taskdata.hours);
          obj[`${day}_total_hours`] = taskdata.hours.toString();
        } else {
          obj[`${day}_in_time`] = "00:00";
          obj[`${day}_out_time`] = "00:00";
          obj[`${day}_total_hours`] = "0";
        }
      });


      return obj;
    }

  }

  return PageModule;
});
