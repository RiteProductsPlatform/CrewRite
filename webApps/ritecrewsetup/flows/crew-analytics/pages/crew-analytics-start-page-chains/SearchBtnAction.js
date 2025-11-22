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

  class SearchBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/CrewTimeAnalytics',
        uriParams: {
          'p_crew_name': $variables.searchObj.crewName ? $variables.searchObj.crewName : "",
          'p_start_date': $variables.searchObj.from_date ? $variables.searchObj.from_date : "",
          'p_resource_name': $variables.searchObj.name ? $variables.searchObj.name : "",
          'p_end_date': $variables.searchObj.to_date ? $variables.searchObj.to_date : "",
          'p_report_name': $variables.searchObj.report,
        },
      });

      if (response.ok) {
        if (response.body.items.length > 0) {
          const columnsArrayGenerator = await $functions.columnsArrayGenerator(JSON.stringify(response.body.items));

          const pieChartData = await $functions.pieChartData(JSON.stringify(response.body.items));

          $variables.CrewTblADP.data = response.body.items;
          $variables.columns = columnsArrayGenerator;
          $variables.chartArray = pieChartData;
        }else{
          await Actions.resetVariables(context, {
            variables: [
    '$page.variables.CrewTblADP.data',
    '$page.variables.ChartADP.data',
  ],
          });
          
        }
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch Crew Details',
          displayMode: 'transient',
        });
      }
    }
  }

  return SearchBtnAction;
});
