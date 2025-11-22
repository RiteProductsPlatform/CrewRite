define([], () => {
  'use strict';

  class PageModule {

    getDayName(index) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[index];
    }
    formatDate(date) {
      return date.getFullYear() + '-' + this.padZero(date.getMonth() + 1) + '-' + this.padZero(date.getDate());
    }

    padZero(num) {
      return (num < 10 ? '0' : '') + num;
    }

    dateFormatter(date) {

      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const mymonthNames = ["JANUARY", "FEBURARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
      const t1 = new Date(date);
      let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate()
      let start_date = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
      let mymonth = mymonthNames[t1.getMonth()];
      return { "date": start_date, "month": mymonth };

    }

    generateWeeksArray(myDate) {
      let startDate = new Date(myDate);
      const year = startDate.getFullYear();
      const month = startDate.getMonth() + 1;
      const dates = [];
      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0);
      let currentWeek = [];
      let weekId = 1;

      for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
        const currentDate = new Date(year, month - 1, i);
        const dayOfWeek = currentDate.getDay();

        currentWeek.push({
          [currentDate.toLocaleString('en-US', { weekday: 'long' })]: currentDate.toISOString().split('T')[0]
        });

        if (dayOfWeek === 0 || i === lastDay.getDate()) {
          dates.push({
            weekid: weekId.toString(),
            ...currentWeek.reduce((acc, curr) => Object.assign(acc, curr), {})
          });
          currentWeek = [];
          weekId++;
        }
      }

      return dates;
    }


    columnsArrayGenerator(columnsArray) {
      var columns = [];
      var uparray = columnsArray.filter((item, index) => columnsArray.indexOf(item) === index);
      for (let k = 0; k < uparray.length; k++) {
        if (uparray[k] === "links") {
          console.log("links");
        } else {
          let obj = {
            "headerText": uparray[k],
            "field": uparray[k]
          };
          columns.push(obj);
        }
      }
      return columns;
    }

    getDatesForMonth(myDate, datesArray) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const inputDate = new Date(myDate);
      const year = inputDate.getFullYear();
      const month = inputDate.getMonth();
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);

      const result = [];
      const mycols = [];
      for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const day = String(date.getDate()).padStart(2, '0');
        const monthName = monthNames[date.getMonth()];
        const formattedDate = `${day}-${monthName}-${year}`;
        let mydate = new Date(formattedDate);
        result.push({ headerText: `${day}-${monthName}`, field: mydate });
      }
      return result;
    }

    isSameDate(date1, date2) {
      return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
    }

    // filterDatesArray(data) {


    //   const datesArray = data.flatMap(item => item.dates);
    //   console.log(datesArray);
    //   const date = new Date(datesArray[0]);
    //   // Get the year and month from the Date object
    //   const year = date.getFullYear();
    //   const month = date.getMonth();
    //   // Set the date to the first day of the month
    //   const startDate = new Date(year, month, 1);
    //   // Set the date to the last day of the month
    //   const endDate = new Date(year, month + 1, 0);

    //   const monthDates = []; // array of dates in a whole month

    //   for (let d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)) {
    //     monthDates.push(new Date(d));
    //   }
    //   let engagedDates = [];
    //   // const engagedDates = monthDates.map(date => {
    //   //   const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    //   //    const isoFormattedDate = new Date(formattedDate).toISOString(); // convert to ISO formatted string
    //   //   return {
    //   //     "date": formattedDate,
    //   //     "engaged": datesArray.includes(isoFormattedDate) ? 'N' : 'Y'
    //   //   };
    //   // });
    //   let obj = {};
    //   for (let i = 0; i < monthDates.length; i++) {
    //     for (let j = 0; j < datesArray.length; j++) {
    //       const isoFormattedDate = new Date(monthDates[i]).toISOString();
    //       const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    //       if (isoFormattedDate === datesArray[i]) {
    //         obj = {
    //           "date": formattedDate,
    //           "engaged": 'N'
    //         }
    //       } else {
    //         obj = {
    //           "date": formattedDate,
    //           "engaged": 'Y'
    //         }
    //       }
    //       engagedDates.push(obj);

    //     }
    //   }


    //   return engagedDates;
    // }

    getDatesandvalues(data) {
      let array = data;
      const result = [];

      array.forEach((item) => {
        let existingResource = result.find((res) => res.resource_name === item.resource_name);

        if (!existingResource) {
          existingResource = {
            resource_name: item.resource_name,
            myArr: []
          };
          result.push(existingResource);
        }

        // Modified line to format date to 'DD'
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dayOfMonth = new Date(item.dates).getDate() >= 10 ? new Date(item.dates).getDate() : '0' + new Date(item.dates).getDate(); // Extract day of the month
        const inputDate = new Date(item.dates);
        const year = inputDate.getFullYear();
        const month = inputDate.getMonth();
        const myDate = dayOfMonth + "-" + monthNames[month] + "-" + year;
        existingResource.myArr.push({
          crewName: item.crew_name,
          resource: item.resource_name,
          resource_id: item.resource_id,
          date: dayOfMonth.toString(),
          myid: item.resource_name + dayOfMonth.toString(),
          setDate: new Date(item.dates).toISOString(),
          input_date: myDate,// Convert to string to match format
          engaged: item.engaged

        });
      });

      return result;
    };

    colorselectedBadge(myid, engaged) {
      if (engaged === 'N') {
        document.getElementById(myid).style.border = '3px solid #33553C';
      } else if (engaged === 'Y') {
        document.getElementById(myid).style.border = '3px solid #880808';
      } else {

      }

    }
    decolorselectedBadge(myid) {
      document.getElementById(myid).style.border = 'none';
    }


    // colorselectedBadge(myid) {
    //   document.getElementById(myid).style.backgroundColor = 'blue';
    //   document.getElementById(myid).style.color = 'white';
    // }
    // decolorselectedBadge(myid) {
    //   document.getElementById(myid).style.backgroundColor = 'transparent';
    //   document.getElementById(myid).style.color = 'black';
    // }





    filterDatesArray(data) {
      const datesArray = data.flatMap(item => item.dates);
      //  const datesArray =["2024-03-01T00:00:00Z", "2024-03-02T00:00:00Z", "2024-03-03T00:00:00Z", "2024-03-04T00:00:00Z", "2024-03-05T00:00:00Z"]
      let exedates = [];
      for (let i = 0; i < datesArray.length; i++) {
        let currdate = new Date(datesArray[i]);
        exedates.push(currdate);
      }
      const mydate = new Date(datesArray[0]);
      const year = mydate.getFullYear();
      const month = mydate.getMonth();
      const mystartDate = new Date(year, month, 1);
      const myendDate = new Date(year, month + 1, 0);
      const monthDates = [];

      // for (let d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)) {
      //   monthDates.push(new Date(d));
      // }
      for (let d = new Date(mystartDate); d <= new Date(myendDate); d.setDate(d.getDate() + 1)) {
        let isoDate = new Date(d).toISOString().slice(0, 10);
        monthDates.push(new Date(isoDate));
      }


      const engagedDates = monthDates.map(date => {
        const isoFormattedDate = new Date(date).toISOString();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        const engaged = exedates.some(range => {
          const [start, end] = range.split('-');
          const startDate = new Date(start);
          const endDate = new Date(end);
          return startDate <= date && date <= endDate;
        });
        return { "date": formattedDate, "engaged": engaged ? 'N' : 'Y' };
      });

      return engagedDates;
    }
    getFinalOutput(dateArray) {

    }


  }

  return PageModule;
});
