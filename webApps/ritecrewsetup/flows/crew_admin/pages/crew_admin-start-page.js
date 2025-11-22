define([], () => {
  'use strict';

  var PageModule = function PageModule() { };

  PageModule.prototype.settoArray = function (data) {
    if (!(data instanceof Set)) {
      throw new TypeError("Expected a Set as input");
    }

    const stringArray = Array.from(data, String);

    const labels = [
      "All",
      "Project",
      "ProjectDetails",
      "ProjectTaskDetails",
      "ProjectTeamMembers",
      "TimeTypes",
      "PayrollElements"
    ];


    const labelPresence = labels.reduce((acc, label) => {
      acc[label] = stringArray.includes(label);
      return acc;
    }, {});

    return { array: stringArray, presence: labelPresence };
  };


  PageModule.prototype.distinctElementnames = function (mydata) {
    let data = JSON.parse(mydata);
    const distinctElements = data.reduce((acc, current) => {
      if (!acc.some(item => item.ElementName === current.ElementName)) {
        acc.push(current);
      }
      return acc;
    }, []);

    return distinctElements;

  }
  PageModule.prototype.getUniqueCustomers = function (data) {
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

  PageModule.prototype.getContractNumbers = function (data) {
    if (data) {
      debugger;
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


  PageModule.prototype.exportCSV = function (data) {
    var result = '';
    result += 'PARTY ID,PARTY NUMBER,PARTY NAME,STATUS,EMAIL ADDRESS,PRIMARY PHONE NUMBER,CONTRACT ID,CONTRACT NUMBER,MAJOR VERSION,START DATE,END DATE,STS CODE,CURRENCY CODE,DATE APPROVED,CONTRACT AMOUNT,PROJECT ID,PROJECT NUMBER,PROJECT NAME,PROJECT STATUS CODE,ORGANIZATION NAME,DESCRIPTION,CONTRACT TYPE,PROJECT TYPE,COMPLETION DATE,CLOSED DATE,TASK ID,TASK NUMBER,TASK NAME,TEAM MEMBER NUMBER,TEAM MEMBER NAME,PROJECT UNIT ID,EXPENDITURE TYPE ID,EXPENDITURE TYPE NAME';
    result += '\n';

    data.forEach(function (item) {

      result += '"' + item['party_id'] + '","'
        + item['party_number'] + '","'
        + item['party_name'] + '","'
        + item['status'] + '","'
        + item['email_address'] + '","'
        + item['primary_phone_number'] + '","'
        + item['contract_id'] + '","'
        + item['contract_number'] + '","'
        + item['major_version'] + '","'
        + item['start_date'] + '","'
        + item['end_date'] + '","'
        + item['sts_code'] + '","'
        + item['currency_code'] + '","'
        + item['date_approved'] + '","'
        + item['contract_amount'] + '","'
        + item['project_id'] + '","'
        + item['project_number'] + '","'
        + item['project_name'] + '","'
        + item['project_status_code'] + '","'
        + item['organization_name'] + '","'
        + item['description'] + '","'
        + item['contract_type'] + '","'
        + item['project_type'] + '","'
        + item['completion_date'] + '","'
        + item['closed_date'] + '","'
        + item['task_id'] + '","'
        + item['task_number'] + '","'
        + item['task_name'] + '","'
        + item['team_member_number'] + '","'
        + item['team_member_name'] + '","'
        + item['project_unit_id'] + '","'
        + item['expenditure_type_id'] + '","'
        + item['expenditure_type_name'] + '"';

      result = result.replace(/null/g, '');
      result += '\n';

    });
    var csv = 'data:text/csv;charset=utf-8,' + result;
    var excel = encodeURI(csv);
    var link = document.createElement('a');
    link.setAttribute('href', excel);
    link.setAttribute('download', 'Master.csv');
    link.click();

  };

  PageModule.prototype.dateFormatter = function (startdate) {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const t1 = new Date(startdate);
    let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate();
    let start_date = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear();
    return start_date;
  };

  PageModule.prototype.createPayloadAppControl = function (arg1) {

    //   dateFormatter(startdate){
    //   const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    //     "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    //   const t1 = new Date(startdate);
    //   let t1Date = t1.getDate() >= 10 ? t1.getDate() : "0" + t1.getDate();
    //   let start_date = t1Date + '-' + monthNames[t1.getMonth()] + '-' + t1.getFullYear(); 
    //   return start_date;
    // };
    console.log("createAdmin", arg1);
    let finalObj = {
      "p_maintain_perdeim_rate_source": arg1.p_maintain_perdeim_rate_source,
      "p_maintain_bonus_rate_source": arg1.p_maintain_bonus_rate_source,
      "p_perdeim_element_map": arg1.p_perdeim_element_map,
      "p_bonus_element_map": arg1.p_bonus_element_map,
      "p_otl_timetype_overtime": arg1.p_otl_timetype_overtime,
      "p_timesheet_entry_method": null,
      "p_currency": arg1.p_currency,
      "p_timesheet_balancing_require": arg1.p_timesheet_balancing_require,
      "p_payroll_lockdown": arg1.p_payroll_lockdown,
      "p_payroll_lockdown_fromdate": this.dateFormatter(arg1.p_payroll_lockdown_fromdate),
      "p_payroll_lockdown_todate": this.dateFormatter(arg1.p_payroll_lockdown_todate),
      "p_element_entry_id": arg1.p_element_entry_id,
      "p_element_type_id": arg1.p_element_type_id,
      "p_entry_type": arg1.p_entry_type,
      "p_creator_type": arg1.p_creator_type,
      "p_entry_sequence": arg1.p_entry_sequence,
      "p_per_dm_amount": arg1.per_dm_amount,
      "p_per_dm_rate": arg1.per_dm_rate,
      "p_bonus_map_amount": arg1.bonus_map_amount,
      "p_bonus_map_rate": arg1.bonus_map_rate
    };
    console.log("createAdmin", finalObj);
    // arg1.p_timesheet_entry_method,
    return finalObj;

  };
  PageModule.prototype.bonusEleADP = function (mydata) {
    let data = JSON.parse(mydata);

    // Create a map to store unique ElementNames with their associated values
    const uniqueElements = new Map();

    // Iterate through the data and store unique ElementNames with their other associated data
    data.forEach(item => {
      if (!uniqueElements.has(item.ElementName)) {
        uniqueElements.set(item.ElementName, {
          id: uniqueElements.size + 2, // Start the ids from 2 (because Overtime will take id 1)
          ElementName: item.ElementName,
          ElementEntryId: item.ElementEntryId,
          ElementTypeId: item.ElementTypeId,
          CreatorType: item.CreatorType,
          PayrollRelationshipNumber: item.PayrollRelationshipNumber,
          EntryType: item.EntryType,
          EntrySequence: item.EntrySequence
        });
      }
    });

    // Convert the map to an array
    const objectArray = Array.from(uniqueElements.values());

    // Add "Overtime" as the first element with id 1
    objectArray.unshift({
      id: 1,
      ElementName: "Overtime",
      ElementEntryId: null, // or an appropriate value
      ElementTypeId: null, // or an appropriate value
      CreatorType: null, // or an appropriate value
      PayrollRelationshipNumber: null, // or an appropriate value
      EntryType: null, // or an appropriate value
      EntrySequence: null // or an appropriate value
    });

    return objectArray;
  }

  PageModule.prototype.getLookupCode = function (data) {
    debugger;
    if (data) {
      
      if (data === 'Frequency') {
        return 'CrewRite_frequency';
      }
      else if (data === 'Time Card Balancing') {
        return 'CrewRite_TimeCardBalancing';
      }
      else if (data === 'Rate Source') {
        return 'CrewRite_ratesSourceList';
      }
      else if (data === 'Crew Type') {
        return 'CrewRite_crewType';
      }
      else if (data === 'Layout Type') {
        return 'CrewRite_Layout_Type';
      }
      else if (data === 'Balancing Source') {
        return 'CrewRite_ratesSourceList';
      }
      else if (data === 'Week Details') {
        return 'CrewRite_ratesSourceList';
      }
      else if (data === 'Crew Measure') {
        return 'CrewRite_Measure';
      }
      else if (data === 'Crew Scope') {
        return 'CrewRite_crewScope';
      }

      else if (data === 'Time Entry Method') {
        return 'CrewRite_EntryMethod';
      }
      else if (data === 'Client ERP System') {
        return 'CrewRite_ClientERPSystem';
      }
      else if (data === 'Yes_No') {
        return 'CrewRite_Yes_No';
      }
      else if (data === 'Hours Type') {
        return 'CrewRite_hoursTypeList';
      }
      else if (data === 'Entry Method') {
        return 'CrewRite_hoursTypeList';
      }

       else if (data === 'OT Type') {
        return 'CrewRite_frequency';
      }

      

      


      

      




    }
  };
  PageModule.prototype.getLookupData = function (data) {
    if (data) {
      let lookArray = [];
      data.forEach((itm, index) => {
        let obj = {
          "id": index + 1,
          "lookup_code": itm.lookup_code,
          "code_meaning": itm.code_meaning,
          "code_description": itm.code_description,
          "enabled": itm.enabled,
          "lookup_type_id":itm.lookup_type_id

        };
        lookArray.push(obj);
      });
      return lookArray;
    }
  };
  PageModule.prototype.getLookupPayload = function(userName,data){
    if(data){
      debugger;
      let obj = {
        "p_lookup_type_id": data.lookup_type_id,
        "p_lookup_code": data.lookup_code,
        "p_code_meaning": data.code_meaning,
        "p_code_description": data.code_description,
        "p_enabled": data.enabled,
        "p_created_by": userName,
        "p_last_updated_by": userName
      };
      return obj;
    }
  };




  return PageModule;
});
