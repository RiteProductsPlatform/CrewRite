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

  class vbEnterListener extends ActionChain {

    /**
     * @param {Object} context
     */

      
   
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
     let paramas = sessionStorage.getItem('parameters');
      $variables.linesObj.project_name = '1003558680';
      $variables.linesObj.effective_start_date_copy = '';
      $variables.linesObj.effective_end_date_copy = '';

    }
  }

  return vbEnterListener;
});
