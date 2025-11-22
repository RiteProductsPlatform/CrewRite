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

  class LinesProjectChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $variables } = context;  
      // $page.variables.linesObj.project_id = data.project_id;
      // $variables.linesObj.project_number = data.segment1;
      $page.variables.linesObj.project_id = data.projectId;
      $variables.linesObj.project_number = data.number;
    }
  }

  return LinesProjectChangeAction;
});
