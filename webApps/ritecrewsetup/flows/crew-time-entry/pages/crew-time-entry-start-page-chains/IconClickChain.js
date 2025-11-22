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

  class IconClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.key
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      let crewSetup_lineid= $variables.currArray.crewsetup_line_id;

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/deleteCrewRite_CrewSetupLines',
        uriParams: {
          'p_crewsetup_line_id': crewSetup_lineid,
        },
      });

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Deleted Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });

        await Actions.callChain(context, {
          chain: 'TR_FetchTimeSheetData_New',
        });
      
      }
      else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Delete Failed',
          displayMode: 'transient',
          type: 'error',
        });
      }
    }
  }

  return IconClickChain;
});
