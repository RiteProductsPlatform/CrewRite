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

  class crewNameValueChangeActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.headerObj.measure = data.crew_measure;
      $variables.headerObj.crewSetupId = data.crewsetup_id;
      $variables.headerObj.customer = data.customer_name;
    }
  }

  return crewNameValueChangeActionChain;
});
