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

  class SelectValueItemChangeChain extends ActionChain {

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
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.currentProjectObj',
  ],
      });

      $variables.currentProjectObj = data;
      $variables.combinationsCurrentRowObj.project = data.name;
      $variables.combinationsCurrentRowObj.project_number = data.number;
      $variables.combinationsCurrentRowObj.project_id = data.projectId;
      //$variables.combinationsCurrentRowObj.project = data.ProjectStatus;

      await $functions.printFunc($variables.currentProjectObj);
    }
  }

  return SelectValueItemChangeChain;
});
