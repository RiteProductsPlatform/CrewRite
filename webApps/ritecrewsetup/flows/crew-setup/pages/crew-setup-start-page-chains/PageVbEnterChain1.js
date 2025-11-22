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

  class vbEnterListener2 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      if(sessionStorage.getItem('parameters')){
       
          
        
      // await Actions.callChain(context, {
      //   id: 'TR_FetchHeadersLines',
      // });

       await Actions.callChain(context, {
         chain: 'TR_FetchHeadersLines_New',
       });
      
        let paramObj = JSON.parse(sessionStorage.getItem('parameters'));
        $variables.linesObj = $variables.crewSetupHeaderObj;
        $variables.linesObj.resource_name = paramObj.equpName;
         $variables.linesObj.project_name = paramObj.projName;
        $variables.linesObj.effective_start_date_copy= paramObj.varStartDate;
        $variables.linesObj.effective_end_date_copy= paramObj.varEndDate;

   const resourceDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#resourceDialog',
          method: 'open',
        });

       

      }
    }
    
  }

  return vbEnterListener2;
});

