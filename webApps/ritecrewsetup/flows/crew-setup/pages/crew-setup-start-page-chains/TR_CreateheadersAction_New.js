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

  class TR_CreateheadersAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validateGroup = await $application.functions.validateGroup('createformvalidation');

      if (validateGroup==="valid") {
        const dateFormatter = await $functions.dateFormatter($variables.crewSetupHeaderObj.start_date, $variables.crewSetupHeaderObj.end_date, undefined, undefined);
        debugger;
        $variables.crewSetupHeaderObj.created_by = $application.user.email;
        $variables.crewSetupHeaderObj.last_updated_by = $application.user.email;
        $variables.crewSetupHeaderObj.contract_amount = "";
        $variables.crewSetupHeaderObj.crewsetup_id = null;
        $variables.crewSetupHeaderObj.po_number = "";
        $variables.crewSetupHeaderObj.po_quantity = 0;
        $variables.crewSetupHeaderObj.po_quantity_measure = "";
        $variables.crewSetupHeaderObj.week = "";
        $variables.crewSetupHeaderObj.end_date = dateFormatter.endDate;
        $variables.crewSetupHeaderObj.start_date = dateFormatter.startDate;
        $variables.crewSetupHeaderObj.template_id = $page.variables.template_id;

        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/postCrewRite_CrewSetup',
          body: $variables.crewSetupHeaderObj,
        });

        if (response.ok) {
          $variables.IsSearch = true;
          $variables.searchCrew = $variables.crewSetupHeaderObj.crew_name;

          await Actions.fireDataProviderEvent(context, {
            target: $variables.getGetCrewNameLOVListSDP,
            refresh: null,
          });

          await Actions.callChain(context, {
            chain: 'TR_FetchHeadersLines_New',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Header Created Successfully',
            type: 'confirmation',
            displayMode: 'transient',
          });
         
        }
        else{
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to create headers',
            type: 'error',
            displayMode: 'transient',
          });

          
        }
        
        
      }
    }
  }

  return TR_CreateheadersAction_New;
});
