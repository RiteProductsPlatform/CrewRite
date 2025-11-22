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

  class updateTblColumnsAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

     // $variables.Columns = $variables.event.value.map(v=>$page.variables.columnOptions.find(i=>i.field === v));
    }
  }

  return updateTblColumnsAction_New;
});
