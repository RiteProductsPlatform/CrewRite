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

  class AddIconClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.controlsVariable_copy.id = $variables.controlsADP.data.length===0?1:$variables.controlsADP.data.length + 1;
      $variables.controlsVariable_copy.isNew ="Yes";
      await Actions.fireDataProviderEvent(context, {
        add: {
          data: $variables.controlsVariable_copy,
          keys: $variables.controlsVariable_copy.id,
        },
        target: $variables.controlsADP,
      });
    }
  }

  return AddIconClickChain;
});
