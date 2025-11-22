define([], () => {
  'use strict';

  class PageModule {

    filterData(selected, mydata, selectedKeys) {
      let data = JSON.parse(mydata);
      let keys = [];
      let filteredData = [];
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

      // return { "startDate": start_date, "endDate": end_date, "sysdate": sysdate, "crewDate": crew_date };
      return start_date;

    }

    updateDateFormat(data) {
      let payload = {};
      payload.crewsetup_id = data.crew_setup_id;

      let frtStartDate = new Date(data.start_date);
      const day = String(frtStartDate.getDate()).padStart(2, 0);
      const month = String(frtStartDate.getMonth() + 1).padStart(2, 0);
      const year = frtStartDate.getFullYear() % 100;

      payload.start_date = `${day}-${month}-${year}`;
      payload.project_name = data.project_name;
      payload.resource_name = data.employee_name;

      let frtEndDate = new Date(data.end_date);
      const day1 = String(frtEndDate.getDate()).padStart(2, 0);
      const month1 = String(frtEndDate.getMonth() + 1).padStart(2, 0);
      const year1 = frtEndDate.getFullYear() % 100;
      payload.end_date = `${day1}-${month1}-${year1}`;
      console.log("payload", payload);
      return payload;
    }

    createTaskTable(rowDataObj) {
      let rowData = { ...rowDataObj };
      console.log("rowDataa", rowData);
      let finalArr = [];


      for (let i = 1; i <= 10; i++) {
        const taskName = rowData[`task_name_${i}`];
        const taskHours = rowData[`task${i}_hours`];


        if (taskName && taskHours > 0) {
          let obj = {
            "id": finalArr.length + 1,
            "project_name": rowData.project_name,
            "resource_name": rowData.resource_name,
            "crew_name": rowData.crew_name,
            "task_name": taskName,
            "task_hours": taskHours
          };
          finalArr.push(obj);
        }
      }

      return finalArr;
    }


  }

  return PageModule;
});
