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

  class TR_SubmitBtnAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const hoursValidated = await $functions.getHoursValidated($variables.FilteredData);

      if (hoursValidated) {
        const results = await ActionUtils.forEach($variables.FilteredData, async (item, index) => {
          const dateFormatter = await $functions.dateFormatter(item.week_start_date, item.week_end_date, $variables.searchobj.crewdate);
          const payloadGenerator = await $functions.payloadGenerator(item, $application.user.email, dateFormatter.startDate, dateFormatter.endDate, $page.variables.searchobj.dateRange, dateFormatter.crewDate, $page.variables.searchobj.specific, $page.variables.maxweekid);
          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postSubmitTimeSheet',
            body: payloadGenerator,
          });

          if (response.ok) {
            $variables.SuccessVar = $page.variables.SuccessVar + 1;            
          }
          else{
            const sysdate = await $functions.getsysdate();
            

          }


          
        }, { mode: 'serial' });

        $variables.isAdd = false;
        $variables.IsApprove = true;

        await Actions.resetVariables(context, {
          variables: [
    '$variables.updateTimeSheet',
  ],
        });

        await Actions.fireNotificationEvent(context, {
          summary: 'Time Sheet submitted Successfully',
          type: 'confirmation',
          displayMode: 'transient',
        });

        const response2 = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/getGetTimeweekId',
          uriParams: {
            'crewsetup_id': $variables.searchobj.crewSetup_id,
          },
        });

        $variables.time_week_id = 'response2.body.items[0].timesheet_week_id';

        if ($variables.isAdd) {
          await Actions.callChain(context, {
            chain: 'TR_FetchTimeSheetData_New',
          });

        }
        else{
          await Actions.callChain(context, {
            chain: 'TR_fetchSearchSheetData_New',
          });

          
        }

        
      }
      else{
        await Actions.fireNotificationEvent(context, {
          summary: 'The selected employee has exceeded 40 hours per week. Please update the timesheet and resubmit it.',
          displayMode: 'transient',
          type: 'warning',
        });
        
      }
    }
  }

  return TR_SubmitBtnAction_New;
});
