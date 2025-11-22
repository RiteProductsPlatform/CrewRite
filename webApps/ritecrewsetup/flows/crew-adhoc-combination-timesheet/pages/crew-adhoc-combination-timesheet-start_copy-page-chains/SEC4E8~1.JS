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

  class SelectValueItemChangeChain4 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {any} params.data
     * @param {any} params.metadata
     * @param {any} params.valueItem
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.currentProjectObj',
  ],
      });

      $variables.currentProjectObj = data;
      $variables.timeEntriesCurrentRowObj.project = data.name;
      $variables.timeEntriesCurrentRowObj.project_number = data.number;
      $variables.timeEntriesCurrentRowObj.project_id = data.projectId;
    }
  }

  return SelectValueItemChangeChain4;
});
