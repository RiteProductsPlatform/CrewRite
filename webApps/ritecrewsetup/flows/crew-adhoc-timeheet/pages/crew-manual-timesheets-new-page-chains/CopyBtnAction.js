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

  class CopyBtnAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.currentAdhocRowData',
  ],
      });

      const maxIdForBatch = await $functions.getMaxIdForBatch(JSON.stringify($variables.AdhocMainUITableADP.data));

      $variables.currentAdhocRowData = current.row;
      $variables.currentAdhocRowData.id = maxIdForBatch;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.AdhocMainUITableADP,
        add: {
          data: $variables.currentAdhocRowData,
        },
      });

      const orderById = await $functions.getOrderById(JSON.stringify($variables.AdhocMainUITableADP.data));

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.AdhocMainUITableADP.data',
  ],
      });

      $variables.AdhocMainUITableADP.data = orderById;
    }
  }

  return CopyBtnAction;
});
