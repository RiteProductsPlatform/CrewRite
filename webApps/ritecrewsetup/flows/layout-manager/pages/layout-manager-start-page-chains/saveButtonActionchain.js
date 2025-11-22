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

  class saveButtonActionchain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const results = await ActionUtils.forEach($variables.layoutTableAdp.data, async (item, index) => {

        const res = await $functions.savelines(item, undefined, undefined, $variables.layoutdialogHeaderobj);

        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/postCrewRite_LayoutManagerLine',
          body: res,
        });
      }, { mode: 'serial' });
    }
  }

  return saveButtonActionchain;
});
