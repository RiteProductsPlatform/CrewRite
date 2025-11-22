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

  class BtnSaveDlgEnableOt extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const createPayload = await $functions.createPayload($variables.FilteredData, $variables.enableOtRow);

      const dlgEnableOtClose = await Actions.callComponentMethod(context, {
        selector: '#dlg-enable-ot',
        method: 'close',
      });
    }
  }

  return BtnSaveDlgEnableOt;
});
