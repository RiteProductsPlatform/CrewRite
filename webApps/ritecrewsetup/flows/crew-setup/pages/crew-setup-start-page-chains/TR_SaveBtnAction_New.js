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

  class TR_SaveBtnAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const dateFormatter = await $functions.dateFormatter($variables.crewSetupHeaderObj.start_date, $variables.crewSetupHeaderObj.end_date, $variables.crewSetupHeaderObj.start_date, $variables.crewSetupHeaderObj.end_date);

      $variables.crewSetupHeaderObj.end_date = dateFormatter.endDate;
      $variables.crewSetupHeaderObj.last_update_date = dateFormatter.sysdate;
      $variables.crewSetupHeaderObj.last_updated_by = $application.user.email;
      $variables.crewSetupHeaderObj.start_date = dateFormatter.startDate;
      $variables.crewSetupHeaderObj.template_id = $variables.template_id;

      const updateCrew = await $functions.updateCrew($variables.crewSetupHeaderObj);

      // const response = await Actions.callRest(context, {
      //   endpoint: 'TimeRite_Ords_Service/postCrewSetupHeader',
      //   body: $variables.crewSetupHeaderObj,
      // });

      const response2 = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/putCrewRite_CrewSetup',
        uriParams: {
          'p_crewsetup_id': $variables.crewSetupHeaderObj.crewsetup_id,
        },
        body: updateCrew,
      });

      if (response2.ok) {
        $variables.IsEdit = false;
        $variables.IsSearch = true;        

        await Actions.fireNotificationEvent(context, {
          summary: 'Details Updated Successfully',
          type: 'confirmation',
          displayMode: 'transient',
        });

        await Actions.callChain(context, {
          chain: 'TR_FetchHeadersLines_New',
        });
      }
      else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to update Headers',
          displayMode: 'transient',
          type: 'error',
        });


        
      }


     
    }
  }

  return TR_SaveBtnAction_New;
});
