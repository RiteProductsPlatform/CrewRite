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

  class TR_AddCrewbtn extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $variables } = context;

      $page.variables.crewView = false;
      $page.variables.crewADD = true;
      $page.variables.IsSearch = false;
      $page.variables.IsEdit = true;
      $page.variables.crewSetupLines.data = [];
      $variables.crewTemplateHeader.crew_template_id = -1;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.crewSetupHeaderObj',
          '$page.variables.searchCrew',
          '$page.variables.crewSetupLines.data',
          '$page.variables.AssignEnabled',
        ],
      });
    }
  }

  return TR_AddCrewbtn;
});
