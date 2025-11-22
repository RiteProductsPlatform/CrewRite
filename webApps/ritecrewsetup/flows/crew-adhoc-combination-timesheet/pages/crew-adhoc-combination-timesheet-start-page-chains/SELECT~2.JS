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

  class SelectValueItemChangeChain1 extends ActionChain {

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

      //$variables.timeEntriesCurrentRowObj = data;
      $variables.timeEntriesCurrentRowObj.time_type = data.time_type;
			$variables.timeEntriesCurrentRowObj.total_hours = data.hours; 
			$variables.timeEntriesCurrentRowObj.location = data.location_tax_jurisdiction;
			$variables.timeEntriesCurrentRowObj.combination_id = data.combination_id;
			$variables.timeEntriesCurrentRowObj.combination_name = data.combination_name;
			$variables.timeEntriesCurrentRowObj.work_package = data.work_package;
			$variables.timeEntriesCurrentRowObj.cost_category = data.cost_category;
			$variables.timeEntriesCurrentRowObj.department = data.department;
			$variables.timeEntriesCurrentRowObj.project = data.project;
			$variables.timeEntriesCurrentRowObj.shift = data.shift;
      $variables.timeEntriesCurrentRowObj.task_name = data.task_name;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.timeEntriesTableADP,
        update: {
          data: $variables.timeEntriesCurrentRowObj,
          indexes: [index],
          keys: [
      key,
    ],
        },
      });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.mainTimeEntriesTableADP,
        update: {
          data: $variables.timeEntriesCurrentRowObj,
          indexes: [
      index,
    ],
          keys: [key],
        },
      });
    }
  }

  return SelectValueItemChangeChain1;
});
