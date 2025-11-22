define(['oj-sp/spectra-shell/config/config'], function () {
  'use strict';

  class AppModule {

    distinctresource(mydata) {
      let data = JSON.parse(mydata);
      const distinctResourceNames = [...new Set(data.map(item => item.resource_name))]
        .map(name => ({ "resource_name": name }));

      return distinctResourceNames;
    }

    populateDateRangeJS() {
      let currentDate = new Date();
      function getMonthAbbreviation(month) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[month];
      }
      let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);
      let dayOfWeek = startDate.getDay();
      let diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); startDate.setDate(diff);
      let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      endDate.setDate(endDate.getDate() - 1);
      let valueList = [];
      let currentWeekStart = new Date(startDate);
      while (currentWeekStart <= endDate) {
        let currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);
        let weekRange = `${currentWeekStart.getDate()}-${getMonthAbbreviation(currentWeekStart.getMonth())}-${currentWeekStart.getFullYear()} to ${currentWeekEnd.getDate()}-${getMonthAbbreviation(currentWeekEnd.getMonth())}-${currentWeekEnd.getFullYear()}`;
        valueList.push(weekRange);
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      }
      let currentWeekRange;
      let today = currentDate.getDate();
      let currentMonth = getMonthAbbreviation(currentDate.getMonth());
      let currentYear = currentDate.getFullYear();
      for (let i = 0; i < valueList.length; i++) {
        let range = valueList[i];
        let rangeStart = parseInt(range.split('-')[0]);
        let rangeEnd = parseInt(range.split(' to ')[1].split('-')[0]);
        let rangeMonth = range.split('-')[1];
        let rangeYear = parseInt(range.split('-')[2]);

        if (currentMonth === rangeMonth && currentYear === rangeYear) {
          if (today >= rangeStart && today <= rangeEnd) {
            currentWeekRange = range;
            break;
          }
        }
      }
      let finalArray = [];
      for (let i = 0; i < valueList.length; i++) {
        finalArray.push({
          "range": valueList[i]
        });
      }
      // document.getElementById("dateRange").value = currentWeekRange;
      let myvaldate = finalArray.reverse();
      return { "dateRange": finalArray.reverse(), "week": currentWeekRange };
    }

    getDateRange(startDay, endDay) {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      const currentDate = new Date();
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

      const startDayIndex = dayNames.indexOf(startDay);
      const endDayIndex = dayNames.indexOf(endDay);

      const dateRange = [];

      while (startDate <= endDate) {
        const startDateOfWeek = new Date(startDate);
        const endDateOfWeek = new Date(startDate);

        while (startDateOfWeek.getDay() !== startDayIndex) {
          startDateOfWeek.setDate(startDateOfWeek.getDate() + 1);
        }

        endDateOfWeek.setDate(startDateOfWeek.getDate() + (endDayIndex - startDayIndex));

        // If end date is before start date, adjust it to next week
        if (endDateOfWeek < startDateOfWeek) {
          endDateOfWeek.setDate(endDateOfWeek.getDate() + 7);
        }

        const rangeString = `${startDateOfWeek.getDate()}-${startDateOfWeek.toLocaleString('default', { month: 'short' })}-${startDateOfWeek.getFullYear()} to ${endDateOfWeek.getDate()}-${endDateOfWeek.toLocaleString('default', { month: 'short' })}-${endDateOfWeek.getFullYear()}`;

        dateRange.push({ range: rangeString });

        startDate.setDate(startDate.getDate() + 7);
      }

      return dateRange;
    }


    validateText() {
      return [
        {
          validate: (mytime) => {
            let enteredTime = mytime;
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
          },
          getHint: () => "Enter time in HH:mm (24 hours) format only"
        }
      ];
    }

    timeValidator(timeObj) {
      debugger;
      const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
      let isValid = true;
      let msg;
      days.forEach(day => {
        const inTime = timeObj[`${day}_in_time`];
        const outTime = timeObj[`${day}_out_time`];
        if (new Date(`${timeObj.effective_start_date_copy}T${inTime}`) > new Date(`${timeObj.effective_end_date_copy}T${outTime}`)) {
          msg = `Invalid time for ${day}: IN Time is greater than OUT Time`;
          isValid = false;
        }
      });
      return {
        "msg": msg,
        "isValid": isValid
      };
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

    getUniqueDayNamesBetweenDates(startDate, myendDate) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let currentDate = new Date(startDate);
      let endDate = new Date(myendDate);
      const result = {};

      while (currentDate <= endDate) {
        const dayName = daysOfWeek[currentDate.getDay()];
        result[dayName] = true;
        currentDate.setDate(currentDate.getDate() + 1);
      }
      console.log("TESTCHECK", result);
      return result;
    }



  }

  return AppModule;
});
