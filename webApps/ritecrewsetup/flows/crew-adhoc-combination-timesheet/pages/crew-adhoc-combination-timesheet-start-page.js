define([], () => {
  'use strict';

  class PageModule {
    printFunc(abc) {
      console.log("JJJJ", abc);
    }

    filterData(selected, mydata, selectedKeys) {
      let data = JSON.parse(mydata);
      var keys = [];
      var filteredData = [];
      if (selected.row.isAddAll()) {
        var iterator = selected.row.deletedValues();
        iterator.forEach(function (key) {
          keys.push(key);
        });
        filteredData = data.filter(function (obj) {
          return !keys.some(function (obj2) {
            return obj.resource_id == obj2;
          });
        });
      }
      else {
        filteredData = data.filter(function (obj) {
          return selectedKeys.some(function (obj2) {
            return obj.resource_id == obj2;
          });
        });
      }
      return filteredData;
    }

    validateGroup(id) {
      let tracker = document.getElementById(id);
      if (tracker.valid === "valid") {
      }
      else if (tracker.valid.startsWith("invalid")) {
        if (tracker.valid === "invalidHidden") {
          tracker.showMessages();
        }
        tracker.focusOn("@firstInvalidShown");
      }
      return tracker.valid;
    }

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

    selectedData(selected, data, selectedKeys) {
      var keys = [];
      var selectedData = [];
      if (selected.row.isAddAll()) {
        let iterator = selected.row.deletedValues();
        iterator.forEach(function (key) {
          keys.push(key);
        });
        selectedData = data.filter(function (obj) {
          return !keys.some(function (obj2) {
            return obj.timeEntryId === obj2;
          });
        });
      }
      else {
        selectedData = data.filter(function (obj) {
          return selectedKeys.some(function (obj2) {
            return obj.timeEntryId === obj2;
          });
        });
      }
      return selectedData;
    };

  }

  return PageModule;
});
