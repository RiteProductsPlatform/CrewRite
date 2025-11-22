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

  class CopyDlgDataAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/CopyTimeSheetPreviousWeek',
        uriParams: {
          'p_crew_week': $variables.copyweek,
          'p_crewsetup_id': $variables.searchobj.crewSetup_id,
        },
      });

      if (!response.ok) {
      
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to fetch Selected Week Records',
          displayMode: 'transient',
        });

        return;
      } else {
         $variables.SearchTimeSheetADP.data = response.body.items;    }
        $variables.isAdd = false;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.copyweek',
  ],
      });

      const copyDialogClose = await Actions.callComponentMethod(context, {
        selector: '#copyDialog',
        method: 'close',
      });
    }
  }

  return CopyDlgDataAction;
});
