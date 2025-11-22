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

  class InputSearchRawValueChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.rawValue 
     */
    async run(context, { rawValue }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      let roidx = await $functions.findrowIndex($variables.crewChkADP.data, rawValue);

      $variables.scrollPos = { rowIndex: 10 };
    }
  }

  return InputSearchRawValueChangeChain1;
});
