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

  class BtnEnableOt extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const dlgEnableOtOpen = await Actions.callComponentMethod(context, {
        selector: '#dlg-enable-ot',
        method: 'open',
      });
    }
  }

  return BtnEnableOt;
});
