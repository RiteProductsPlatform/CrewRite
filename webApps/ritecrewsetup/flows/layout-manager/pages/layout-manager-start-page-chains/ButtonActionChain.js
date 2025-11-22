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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;
       $variables.postlayoutCopy.id = $page.variables.layoutTableAdp.data.length === 0 ? 1
        : Math.max(...$page.variables.layoutTableAdp.data.map(obj => obj.id)) + 1;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.layoutTableAdp,
        add: {
          data: $variables.postlayoutCopy,
          keys: $variables.postlayoutCopy.id,
        },
      });
    }
  }

  return ButtonActionChain;
});
