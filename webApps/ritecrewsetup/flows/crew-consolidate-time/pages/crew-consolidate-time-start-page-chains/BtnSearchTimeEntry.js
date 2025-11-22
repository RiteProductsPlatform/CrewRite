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

  class BtnSearchTimeEntry extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      if ($page.variables.SearchParams.start_date && $page.variables.SearchParams.end_date) {

        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.ManualTimeEntryADP',
          ],
        });

        const updateDateFormat = await $page.functions.updateDateFormat($page.variables.SearchParams);

        const callRestFetchTimeEntry = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getTR_Manual_Timeentry_Submit',
          uriParams: {
            'crewsetup_id': updateDateFormat.crewsetup_id ? updateDateFormat.crewsetup_id : '',
            'start_date': updateDateFormat.start_date,
            'end_date': updateDateFormat.end_date,
            'project_name': updateDateFormat.project_name ? updateDateFormat.project_name : '',
            'resource_name': updateDateFormat.resource_name ? updateDateFormat.resource_name : '',
          },
        });

        if (callRestFetchTimeEntry.body.count > 0) {
          $page.variables.ManualTimeEntryADP.data = callRestFetchTimeEntry.body.items;
        }
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please select Mandatory fields',
        });
      }
    }
  }

  return BtnSearchTimeEntry;
});
