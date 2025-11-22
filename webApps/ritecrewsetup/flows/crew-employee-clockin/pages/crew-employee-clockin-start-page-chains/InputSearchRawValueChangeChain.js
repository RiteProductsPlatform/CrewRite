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

  class InputSearchRawValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.rawValue 
     */
    async run(context, { rawValue }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      const rowData = await $functions.getFilterData($variables.crewChkADP.data, rawValue);

      $variables.crewChkADP.data = rowData;
    }
  }

  return InputSearchRawValueChangeChain;
});
