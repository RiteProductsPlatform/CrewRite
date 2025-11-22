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

  class AddEntryActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.timeEntriesBlankRowObj.timeEntryId = ($variables.mainTimeEntriesTableADP.data.length === 0) ? 1 : $variables.mainTimeEntriesTableADP.data.length + 1;
      $variables.timeEntriesBlankRowObj.isNew = 'Y';

      await Actions.fireDataProviderEvent(context, {
        target: $variables.mainTimeEntriesTableADP,
        add: {
          data: $variables.timeEntriesBlankRowObj,
          keys: $variables.timeEntriesBlankRowObj.timeEntryId,
        },
      });
    }
  }

  return AddEntryActionChain;
});
