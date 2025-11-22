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

  class CloseRequestresourceAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const resourceRequestClose = await Actions.callComponentMethod(context, {
        selector: '#resourceRequest',
        method: 'close',
      });
    }
  }

  return CloseRequestresourceAction;
});
