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

  class TR_fetchSearchSheetData_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;


      const validateGroup = await $application.functions.validateGroup('SearchValidationgroup');

      if (validateGroup === 'valid') {
        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/GetMaxWeekid',
          uriParams: {
            'crew_week': $variables.searchobj.dateRange,
            'crewsetup_id': $variables.searchobj.crewSetup_id,
          },
        });

        $variables.maxweekid = response.body.items[0].weekid === null || typeof response.body.items[0].weekid === "undefined" ? 1 : response.body.items[0].weekid;

        await Actions.resetVariables(context, {
          variables: [
            '$variables.FilteredData',
            '$variables.SearchTimeSheetADP',
            '$variables.AddTimeSheetADP',
          ],
        });

        if ($page.variables.searchobj.specific === "DAY") {
          const dateFormatter = await $functions.dateFormatter(undefined, undefined, $variables.searchobj.crewdate);

          const day = await $functions.getDay($variables.searchobj.crewdate, false, $variables.searchobj.measure);

          $variables.Columns = day.columns;

          $variables.columnOptions = day.columns;




        }
        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getGetTimeweekId',
          uriParams: {
            'crew_date': $page.variables.searchobj.specific === "DAY" ? $functions.getDay().crewDate : "",
            'crewsetup_id': $variables.searchobj.crewSetup_id,
            week: $variables.searchobj.dateRange ? $variables.searchobj.dateRange : "",
          },
        });

        if (response2.body.items.length > 0) {
          $variables.time_week_id = response2.body.items[0].timesheet_week_id;
          // const response3 = await Actions.callRest(context, {
          //   endpoint: 'TimeRite_Ords_Service/getSearchTimeEntryTbl',
          //   uriParams: {
          //     'crewsetup_id': $variables.searchobj.crewSetup_id,
          //     'timesheet_week_id': $page.variables.time_week_id ? $page.variables.time_week_id : "",
          //     'crew_date': $variables.searchobj.specific === "DAY" ? $functions.getDay().crewDate : "",
          //     'crew_week': $variables.searchobj.specific === "WEEK" ? $variables.searchobj.dateRange : "",
          //   },
          // });


          const response3 = await Actions.callRest(context, {
            endpoint: 'CrewRite_ORDS/getCrewRite_ApprovalDataSearch',
            uriParams: {
              'crewsetup_id': $variables.searchobj.crewSetup_id,           
              'timesheet_week_id': $page.variables.time_week_id ? $page.variables.time_week_id : "",
              'crew_date': $variables.searchobj.specific === "DAY" ? $functions.getDay().crewDate : "",
              'crew_week': $variables.searchobj.specific === "WEEK" ? $variables.searchobj.dateRange : "",
            },
          });

          if (response3.ok) {
            if (response3.body.items.length > 0) {
              $variables.SearchTimeSheetADP.data = response3.body.items;
            }
            else {
              await Actions.resetVariables(context, {
                variables: [
                  '$variables.SearchTimeSheetADP',
                ],
              });

              $variables.isAdd = true;



            }


          }
          else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed to fetch Details',
              type: 'error',
              displayMode: 'transient',
            });

          }
        }
        else {

          await Actions.fireNotificationEvent(context, {
            summary: 'You dont have data for the selected Crew. Please ADD',
            type: 'error',
            displayMode: 'transient',
          });

        }





      }
    }
  }

  return TR_fetchSearchSheetData_New;
});
