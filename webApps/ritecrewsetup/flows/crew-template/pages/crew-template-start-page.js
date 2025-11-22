define([], () => {
  'use strict';

  class PageModule {

    constructor(context) {
      this.editInProgressPromise = Promise.resolve();
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

    /**
     * Trigger form validation and return true if form is valid. Form in
     * this recipe is currently editted row.
     */
    isFormValid(event) {
      const detail = event.detail;
      if (detail !== undefined && detail.cancelEdit === true) {
        // skip validation
        return true;
      }
      // iterate over editable fields which are marked with "editable" class
      // and make sure they are valid:
      let table = event.target;
      if (table === undefined) {
        table = event.detail.originalEvent.target;
      }
      // debugger;
      let editables = table.querySelectorAll(".editable");
      for (let i = 0; i < editables.length; i++) {
        let editable = editables.item(i);
        editable.validate();
        // Table does not currently support editables with async validators
        // so treating editable with 'pending' state as invalid
        if (editable.valid !== "valid") {
          return false;
        }
      }
      return true;
    }



    getISODate(date) {
      return new Date(date);
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
      let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate()
      const t2 = new Date(enddate);
      let t2Date = t2.getDate() >= 10 ? t2.getDate() : "0" + t2.getDate()
      let start_date = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      let end_date = t2Date + '-' + monthNames[t2.getMonth()] + '-' + t2.getFullYear();
      let sysdate = new Date();
      let t3Date = sysdate.getDate() > 10 ? sysdate.getDate() : "0" + sysdate.getDate()
      let currentdate = t3Date + '-' + monthNames[sysdate.getMonth()] + '-' + sysdate.getFullYear();

      const h1 = new Date(startdate);
      let h1Date = h1.getDate() >= 10 ? h1.getDate() : "0" + h1.getDate()
      const h2 = new Date(enddate);
      let h2Date = h2.getDate() >= 10 ? h2.getDate() : "0" + h2.getDate()
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




  }

  return PageModule;
});
