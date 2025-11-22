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

  class TR_CrewNamevalueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $variables } = context;

      if (data) {

        $page.variables.searchobj.measure = data.crew_measure;
        $page.variables.searchobj.customer = data.customer_name;
        $page.variables.searchobj.crewSetup_id = data.crewsetup_id;
      } else {
        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.searchobj.measure',
    '$page.variables.searchobj.customer',
    '$page.variables.searchobj.crewSetup_id',
  ],
        });
      }
    }
  }

  return TR_CrewNamevalueChangeAction;
});
