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

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getSetUpCustomerDetails',
        responseType: 'getSetUpCustomerDetailsResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });
      
      

     const uniqueCustomer = await $functions.getUniqueCustomers(callRestEndpoint1.body.items);

      return uniqueCustomer;
    }
  }

  return getSetUpCustomerDetailsFetch;
});
