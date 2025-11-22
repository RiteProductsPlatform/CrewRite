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

  class reprocessADPBeforeRowEdit extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.rowKey 
     * @param {number} params.rowIndex 
     * @param {any} params.rowData 
     */
    async run(context, { rowKey, rowIndex, rowData }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.reprocessRowData',
  ],
      });

      $variables.reprocessRowData = rowData;
    }
  }

  return reprocessADPBeforeRowEdit;
});
