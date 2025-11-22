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

  class getCrewRite_ContractDetailsFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_ContractDetails',
        uriParams: {
          'CUSTOMER_NUMBER': $variables.crewSetupHeaderObj.contract_number,
        },
        responseType: 'getCrewRiteContractDetailsResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      const uqcostmer = await $functions.getContractNumbers(callRestEndpoint1.body);

      return uqcostmer;
    }
  }

  return getCrewRite_ContractDetailsFetch;
});
