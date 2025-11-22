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

  class DefaultActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, originalEvent, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await this.removeSelection(context);

      const ojDialogCombinationResourceMappingOpen = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-Combination-Resource-Mapping',
        method: 'open',
      });

      $variables.tempCombinationRowObj = current.row;

      await $functions.printFunc(current.row);
    }

    /**
     * @param {Object} context
     */
    async removeSelection(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
        
        let tableResource = document.getElementById("resource-mapping-popup");
        if (tableResource) {
          tableResource.selection = [];
        }

    }
  }

  return DefaultActionChain;
});
