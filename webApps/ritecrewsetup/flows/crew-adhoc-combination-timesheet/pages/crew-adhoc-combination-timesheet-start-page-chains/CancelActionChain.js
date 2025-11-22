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

  class CancelActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const ojDialogCombinationResourceMappingClose = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-Combination-Resource-Mapping',
        method: 'close',
      });
    }
  }

  return CancelActionChain;
});
