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

  class SubmitBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;



     

      const results = await ActionUtils.forEach($variables.CrewTemplateTblADP.data, async (item, index) => {

        $variables.currentRowBuffer = $variables.CrewTemplateTblADP.data[index];

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postCrewTemplateLines',
          headers: {
            'template_id': $variables.searchTemplateId,
          },
          body: $variables.currentRowBuffer,
        });

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.currentRowBuffer',
  ],
        });
      }, { mode: 'serial' });

      const resourceRequestClose = await Actions.callComponentMethod(context, {
        selector: '#resourceRequest',
        method: 'close',
      });
    }

  }

  return SubmitBtnAction;
});
