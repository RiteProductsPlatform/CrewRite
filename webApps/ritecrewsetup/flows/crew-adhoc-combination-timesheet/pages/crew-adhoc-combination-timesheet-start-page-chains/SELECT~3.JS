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

  class SelectValueItemChangeChain2 extends ActionChain {

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
    '$variables.currentTaskObj',
  ],
      });

      $variables.currentTaskObj = data;
      $variables.combinationsCurrentRowObj.task_name = data.TaskName;
      $variables.combinationsCurrentRowObj.task_id = data.TaskId;
      $variables.combinationsCurrentRowObj.task_number = data.TaskNumber;
      $variables.combinationsCurrentRowObj.task_date = data.TaskFinishDate;
    }
  }

  return SelectValueItemChangeChain2;
});
