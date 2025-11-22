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

  class ReprocessSubmitBtnAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      let isSuccess = false;

      const results = await ActionUtils.forEach($variables.ReprocesstblADP.data, async (item, index) => {
      
        const dateFormatter = await $functions.dateFormatter(item.week_start_date, item.week_end_date, $variables.searchobj.crewdate);
        const payloadGenerator = await $functions.payloadGenerator(item, $application.user.email, dateFormatter.startDate, dateFormatter.endDate, $variables.searchobj.dateRange, dateFormatter.crewDate, $variables.searchobj.specific, $variables.maxweekid);

        const results2 = await Promise.all([
          async () => {

            const response = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postTR_TimeEntryLogDetails',
              body: payloadGenerator,
            });
          },
          async () => {

            const response2 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/postSubmitTimeSheet',
              body: payloadGenerator,
            });

            if (response2.ok) {
              $variables.SuccessVar = $variables.SuccessVar + 1;
              isSuccess= true;

              const reprocessDialogClose = await Actions.callComponentMethod(context, {
                selector: '#reprocessDialog',
                method: 'close',
              });
             
            }
            else{
              const sysdate = await $functions.getsysdate();
              
            }
          },
        ].map(sequence => sequence()));

        
      }, { mode: 'serial' });

      if (isSuccess) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Time Sheet submitted Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }
    }
  }

  return ReprocessSubmitBtnAction_New;
});
