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

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/deleteCrewRite_CrewSetupLines',
        uriParams: {
          'p_crewsetup_line_id': current.row.crewsetup_line_id,
        },
      });

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Deleted Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });

        await Actions.resetVariables(context, {
          variables: [
    '$variables.crewSetupLinesADP',
  ],
        });

        const response2 = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_CrewSetupLines',
          uriParams: {
            'p_crewsetup_id': $variables.crewSetupHeaderObj.crewsetup_id,
          },
        });

        $variables.crewSetupLinesADP.data = response2.body.items;
      }
    }
  }

  return IconClickChain;
});
