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

  class TR_MultRowColumnsAction_New extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object} params.previousValue
     * @param {object} params.value
     * @param {string} params.updatedFrom
     * @param {any[]} params.keys
     * @param {any} params.selected
     */
    async run(context, { event, previousValue, value, updatedFrom, keys, selected }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const filterData = await $functions.filterData(selected, $page.variables.isAdd ? $page.variables.AddTimeSheetADP.data : $page.variables.SearchTimeSheetADP.data, keys, $page.variables.isAdd);

      $variables.FilteredData = filterData;
    }
  }

  return TR_MultRowColumnsAction_New;
});
