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

  class AddButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.timeEntryObj_copy.id = $variables.dynamicADP.data.length ===0?1 : $variables.dynamicADP.data.length + 1;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.dynamicADP,
        add: {
          data: $variables.timeEntryObj_copy,
          indexes: $variables.timeEntryObj_copy.id,
        },
      });
    }
  }

  return AddButtonActionChain;
});
