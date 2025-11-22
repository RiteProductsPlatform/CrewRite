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

  class getCrewRite_CustomerDetailsFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_CustomerDetails',
        responseType: 'getCrewRiteCustomerDetailsResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

     const uniqResult =  await $functions.getUniqueCustomers(callRestEndpoint1.body);

      return uniqResult;
    }
  }

  return getCrewRite_CustomerDetailsFetch;
});
