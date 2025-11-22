define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class TR_FetchTimeSheetData_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validateGroup = await $application.functions.validateGroup('SearchValidationgroup');
      debugger;

      if (validateGroup === 'valid') {
        await Actions.callChain(context, {
          chain: 'fetchMaxWeekId_New',
        });

        await Actions.resetVariables(context, {
          variables: [
            '$variables.FilteredData',
            '$variables.AddTimeSheetADP',
            '$variables.SearchTimeSheetADP',
            '$variables.columnOptions',
            '$variables.Columns',
          ],
        });
        const dateFormatter = await $functions.dateFormatter(undefined, undefined, $variables.searchobj.crewdate);
        if ($page.variables.searchobj.specific === "DAY") {
          
          const days = await $functions.getDay($page.variables.searchobj.crewdate, true, $page.variables.searchobj.measure);
          $variables.Columns = days.columns;          
        }

        
        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_TimeEntryAdd',
          uriParams: {
            'contract_number': $variables.searchobj.contract ? $page.variables.searchobj.contract : "",
             'crew_name': $variables.searchobj.timecrew ? $page.variables.searchobj.timecrew :"",
             'customer_name': "",
             'project_number': $variables.searchobj.project ? $variables.searchobj.project : "",
             'search_date': $variables.searchobj.specific === "DAY" ? dateFormatter.crewDate : $page.variables.searchobj.specific ==="WEEK" ? $page.variables.searchobj.dateRange:"",
       
          },
        });

        // const response = await Actions.callRest(context, {
        //   endpoint: 'TimeRite_Ords_Service/getGetTimeSheetTbl',
        //   uriParams: {
        //     'contract_number': $variables.searchobj.contract ? $page.variables.searchobj.contract : "",
        //     'crew_name': $variables.searchobj.timecrew ? $page.variables.searchobj.timecrew :"",
        //     'customer_name': "",
        //     'project_number': $variables.searchobj.project ? $variables.searchobj.project : "",
        //     'search_date': $variables.searchobj.specific === "DAY" ? dateFormatter.crewDate : $page.variables.searchobj.specific ==="WEEK" ? $page.variables.searchobj.dateRange:"",
        //   },
        // });

        if (response.ok) {
          $variables.AddTimeSheetADP.data = response.body.items;
         
        }
        else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to fetch Data',
            type: 'error',
            displayMode: 'transient',
          });
          
        }
      }
    }
  }

  return TR_FetchTimeSheetData_New;
});
