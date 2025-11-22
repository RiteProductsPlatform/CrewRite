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

  class AddBtnAction_New extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.columns',
  ],
      });

      const results = await Promise.all([
        async () => {

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/getMaxCrewDate',
            uriParams: {
              'p_crew_date': $variables.headerParams.date,
              'p_crewsetup_id': $variables.headerParams.crewId ? $variables.headerParams.crewId :"",
              'p_project_id': $variables.headerParams.projectId,
            },
          });

          $variables.maxweekid = response.body.items.length > 0 ? response.body.items[0].max_crew_date_id:1;
        },
        async () => {

          const response2 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/TR_ProjectResourceDetails',
            uriParams: {
              'project_id': $variables.headerParams.projectId,
            },
          });

          if (response2.ok) {
            const columnsGenerator = await $functions.columnsGenerator($variables.headerParams, $variables.taskTblADP.data);
            const createAdhocUITableADP = await $functions.createAdhocUITableADP(response2.body.items, $variables.headerParams, $variables.taskTblADP.data, $variables.equipNameArray.length > 0 ? $variables.equipNameArray : [], $variables.AddResourceParams.resource_name ? $variables.AddResourceParams : "");

            $variables.columns = columnsGenerator;
            $variables.AdhocMainUITableADP.data = createAdhocUITableADP;
           
          }
          else{
            await Actions.fireNotificationEvent(context, {
              summary: 'Failed to fetch details',
              type: 'error',
              displayMode: 'transient',
            });
            
          }
        },
      ].map(sequence => sequence()));
    }
  }

  return AddBtnAction_New;
});
