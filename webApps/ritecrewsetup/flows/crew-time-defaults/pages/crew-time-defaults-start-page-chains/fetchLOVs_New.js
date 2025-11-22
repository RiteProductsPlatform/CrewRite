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

  class fetchLOVs_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const yesNo = await $functions.getYesNo();
      $variables.YesorNoADP.data = yesNo;
      const eRPSystem = await $functions.getERPSystem();
      $variables.ERPSystemADP.data = eRPSystem;
    }
  }

  return fetchLOVs_New;
});
