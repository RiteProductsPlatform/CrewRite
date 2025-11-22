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

  class WeekvalueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (data.range === $variables.searchobj.dateRange) {
        await Actions.fireNotificationEvent(context, {
          summary: 'The selected week for copying should not be the same as a Current Week week.',
        });

      }else{
        
      }
    }
  }

  return WeekvalueChangeAction;
});
