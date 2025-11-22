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

  class AddCombinationActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.combinationsBlankRowObj.combination_id = ($variables.combinationsTableADP.data.length === 0) ? 1 : $variables.combinationsTableADP.data.length + 1;
      $variables.combinationsBlankRowObj.isNew = 'Y';

      await Actions.fireDataProviderEvent(context, {
        target: $variables.combinationsTableADP,
        add: {
          data: $variables.combinationsBlankRowObj,
          keys: $variables.combinationsBlankRowObj.combination_id,
        },
      });
    }
  }

  return AddCombinationActionChain;
});
