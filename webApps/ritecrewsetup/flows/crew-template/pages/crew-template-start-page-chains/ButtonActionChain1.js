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

  class ButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postCrewTemplateHeader',
        body: $variables.crewTemplateHeader,
      });


      $variables.crewTemplateHeader.crew_template_id = response.body.X_TEMPLATE_ID;

      let editItems = $page.variables.crewLinesBDP.instance.getSubmittableItems();

      editItems.forEach((editItem) => {
        let record = JSON.parse(JSON.stringify(editItem.item.data));
        Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postCrewTemplateLines',
headers: {
          'template_id': $variables.crewTemplateHeader.crew_template_id,
        },          
          body: record,
        });
      });

      await Actions.fireNotificationEvent(context, {
        summary: 'Success',
        message: 'Template Succesfully Saved',
        displayMode: 'transient',
        type: 'confirmation',
      });

      $variables.crewADD = false;

      await Actions.fireDataProviderEvent(context, {
        refresh: null,
        target: $variables.getCrewTemplateLinesListSDP,
      });


    }
  }

  return ButtonActionChain1;
});
