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

  class divClickChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $variables } = context;

      const navigateToFlowCrewSetupResult = await Actions.navigateToFlow(context, {
        target: 'parent',
        flow: 'crew-setup',
        page: 'crew-setup-start',
        params: {
          searchCrew: $variables.selectedCrewName,
        },
      });
    }
  }

  return divClickChain;
});
