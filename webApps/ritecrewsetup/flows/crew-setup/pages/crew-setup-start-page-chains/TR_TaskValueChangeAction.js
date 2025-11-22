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

  class TR_TaskValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $variables } = context;
      debugger;

      if (data.TaskName) {
        $page.variables.linesObj.task_id = data.TaskId;
        $page.variables.addEquipObj.task_id =  data.TaskId;
        $page.variables.linesObj.task_number = data.TaskNumber;        
        $page.variables.addEquipObj.task_number =  data.TaskNumber;
      } else {
         await Actions.resetVariables(context, {
           variables: [
             '$page.variables.linesObj.TaskId',
             '$page.variables.addEquipObj.TaskId',
             '$page.variables.addEquipObj.TaskNumber'
           ],
         });
      }

    }
  }

  return TR_TaskValueChangeAction;
});
