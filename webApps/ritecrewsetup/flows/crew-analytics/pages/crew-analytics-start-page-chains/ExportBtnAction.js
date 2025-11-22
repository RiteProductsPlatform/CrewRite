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

  class ExportBtnAction extends ActionChain {

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
          await $functions.csvdownload(JSON.stringify(response.body.items), $variables.searchObj.report+".csv");

        }else{
          await Actions.fireNotificationEvent(context, {
            summary: 'No Data to Export',
          });
          
        }


      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch Crew Details',
          displayMode: 'transient',
        });

        return;
      }
    }
  }

  return ExportBtnAction;
});
