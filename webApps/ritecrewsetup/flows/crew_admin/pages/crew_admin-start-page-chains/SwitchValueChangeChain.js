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

  class SwitchValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (value) {
        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.crewApplicationControlObj.p_payroll_lockdown_fromdate',
    '$page.variables.crewApplicationControlObj.p_payroll_lockdown_todate',
  ],
        });

        const customDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#custom-dialog',
          method: 'open',
        });
      }
    }
  }

  return SwitchValueChangeChain;
});
