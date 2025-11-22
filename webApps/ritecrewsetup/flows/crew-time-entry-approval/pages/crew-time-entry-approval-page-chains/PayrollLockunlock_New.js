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

  class PayrollLockunlock_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions, $chain } = context;

      if ($page.variables.searchobj.specific === "DAY") {
        const dateFormatter = await $functions.dateFormatter(undefined, undefined, $variables.searchobj.crewdate);
         $variables.PayrolLock.crewDate = $variables.searchobj.specific === "DAY" ? dateFormatter.crewDate : ""; 
         $variables.PayrolLock.crew_week = $variables.searchobj.specific === "WEEK" ? $variables.searchobj.dateRange : "";
         $variables.PayrolLock.lock_status = $variables.isPayRollLock ? "Y" : "N";
         $variables.PayrolLock.crew_setup_id = $variables.searchobj.crewSetup_id;

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/PayrollLockUnlock',
          body: $variables.PayrolLock,
        });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: $page.variables.isPayRollLock ? "Payroll Lock initiated Successfully" : "Payroll Lock initiated Successfully",
            type: 'confirmation',
            displayMode: 'transient',
          });
         
        }
        else{
          await Actions.fireNotificationEvent(context, {
            summary: $chain.results.callRestPayrollLockUnlock.message.summary,
            type: 'error',
            displayMode: 'transient',
          });
          
        }
        
      }
      

    }
  }

  return PayrollLockunlock_New;
});
