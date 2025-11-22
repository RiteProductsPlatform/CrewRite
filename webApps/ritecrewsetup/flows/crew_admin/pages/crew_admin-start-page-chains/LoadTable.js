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

  class LoadTable extends ActionChain {
    async run(context) {
      const { $variables, $functions } = context;
      $variables.showTable = true;
      $variables.showFields = false; // Hide fields if previously shown

      if ($variables.ctype) {
        
       const lookup =  await $functions.getLookupCode($variables.ctype);

        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_CrewDefinitionLookups',
          uriParams: {
            'p_lookup_type': lookup,
          },
        });

        if (response.ok) {          
         const ldata1=   await $functions.getLookupData(response.body.items);          
          $variables.controlsADP.data = ldata1;         
        }
      }
      else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select  Crew Maintance Object',
          displayMode: 'transient',
          type: 'error',
        });
        
      }
    }
  }

  return LoadTable;
});
