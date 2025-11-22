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

  class disbandBtnAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validateGroup = await $application.functions.validateGroup('disbandgroup');

      if (validateGroup=== 'valid') {
        const dateFormatter = await $functions.dateFormatter($page.variables.disbandCrewObj.crew_disband_date, undefined, undefined, undefined);
        $variables.disbandCrewObj.crew_disband_date = dateFormatter.startDate;
        $variables.disbandCrewObj.crewsetup_id = $page.variables.selectedCrewSetupid;

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/DisbandCrew',
          body: $variables.disbandCrewObj,
        });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Disband Initiated Successfully',
            type: 'confirmation',
            displayMode: 'transient',
          });

          await Actions.callChain(context, {
            chain: 'TR_FetchHeadersLines_New',
          });

          const disbandDialogClose = await Actions.callComponentMethod(context, {
            selector: '#disbandDialog',
            method: 'close',
          });

          await Actions.resetVariables(context, {
            variables: [
    '$variables.disbandCrewObj',
  ],
          });
        }
        else{
          await Actions.fireNotificationEvent(context, {
            summary: 'failed to initiate Disband',
            type: 'error',
            displayMode: 'transient',
          });
          
        }


        
      }
    }
  }

  return disbandBtnAction_New;
});
