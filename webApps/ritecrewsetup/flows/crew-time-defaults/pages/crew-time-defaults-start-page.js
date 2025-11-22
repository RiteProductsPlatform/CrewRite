define([], () => {
  'use strict';

  class PageModule {

    weekDaysCount(startDay, endDay) {
      const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const startIndex = weekdays.indexOf(startDay);
      const endIndex = weekdays.indexOf(endDay);
      let diff = endIndex - startIndex;

      // Adjust the difference if endDay comes before startDay in the week
      if (diff < 0) {
        diff += 7;
      }

      // If startDay and endDay are the same, return 1
      if (diff === 0) {
        return 1;
      }

      // For cases where endDay is after startDay, return the number of days between inclusive
      return diff + 1;
    }  
  }
  PageModule.prototype.getERPSystem = function () {
    return [
      {
        "value": "Oracle EBS"
      },
      {
        "value": "SAP"
      },
      {
        "value": "Oracle Cloud"
      },
      {
        "value": "Salesforce"
      }
    ];
  };
    PageModule.prototype.getYesNo = function () {
    return [
      {
        "value": "Yes"
      },
      {
        "value": "No"
      }
    ];
  };
 PageModule.prototype.getUniqueCustomers = function (data) {
  if (data) {
    let bodyArray = { body: { items: [] } };
    let uniqcust = [];

    data.forEach(itm => {
      if (!uniqcust.includes(itm.customer_name)) {
        bodyArray.body.items.push(itm);
        uniqcust.push(itm.customer_name);
      }
    });
    return bodyArray;
  }
};


  return PageModule;
});
