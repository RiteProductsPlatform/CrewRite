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

  class getSetUpCustomerDetailsFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      debugger;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getSetUpCustomerDetails',
        responseType: 'getSetUpCustomerDetailsResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      const customers = await $functions.getCustomerNames(callRestEndpoint1.body);

      return customers;
    }
  }

  return getSetUpCustomerDetailsFetch;
});
