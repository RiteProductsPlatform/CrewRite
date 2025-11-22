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

  class RequestresourceBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const resourceRequestOpen = await Actions.callComponentMethod(context, {
        selector: '#resourceRequest',
        method: 'open',
      });
    }
  }

  return RequestresourceBtnAction;
});
