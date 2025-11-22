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
      $page.variables.IsEdit = false;
      $page.variables.crewSetupLinesADP.data = [];
      $variables.copyEnable = true;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.crewSetupHeaderObj',
          '$page.variables.searchCrew',
          '$page.variables.crewSetupLinesADP.data',
          '$page.variables.AssignEnabled',
        ],
      });
    }
  }

  return TR_AddCrewbtn;
});
