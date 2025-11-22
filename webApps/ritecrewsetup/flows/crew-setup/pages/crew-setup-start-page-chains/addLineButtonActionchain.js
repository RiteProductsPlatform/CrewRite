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

  class addLineButtonActionchain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.edit = true;

      const combinationFormOpen = await Actions.callComponentMethod(context, {
        selector: '#combinationForm',
        method: 'open',
      });

      // $variables.combinationObj_copy.combination_id
      //   = $page.variables.combinationAdp.data.length === 0 ? 1
      //     : Math.max(...$page.variables.combinationAdp.data.map(obj => obj.combination_id
      //     )) + 1;

      // await Actions.fireDataProviderEvent(context, {
      //   target: $variables.combinationAdp,
      //   add: {
      //     data: $variables.combinationObj_copy,
      //     keys: $variables.combinationObj_copy.combination_id,
      //   },
      // });
    }
  }

  return addLineButtonActionchain;
});
