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

  class HyperlinkClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const createTaskTable = await $functions.createTaskTable(current.row);

      $variables.taskTableADP.data = createTaskTable;

      const dlgTaskListOpen = await Actions.callComponentMethod(context, {
        selector: '#dlg-task-list',
        method: 'open',
      });
    }
  }

  return HyperlinkClickChain;
});
