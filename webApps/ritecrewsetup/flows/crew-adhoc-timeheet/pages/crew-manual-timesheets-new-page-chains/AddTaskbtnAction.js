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

  class AddTaskbtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.taskObj',
  ],
      });

      $variables.taskNum = $variables.taskNum + 1;
      $variables.taskObj.rownum = $variables.taskNum;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.taskTblADP,
        add: {
          data: $variables.taskObj,
        },
      });
    }
  }

  return AddTaskbtnAction;
});
