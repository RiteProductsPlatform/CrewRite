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

  class layoutHreaderSaveActoionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const saveHeader = await $functions.saveHeader($variables.layoutdialogHeaderobj);

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/postCrewRite_LayoutManager',
        body: saveHeader,
      });

      $variables.layoutdialogHeaderobj.responseid = response.body.p_layout_id;

      if (response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Layout Header Created ',
          type: 'confirmation',
          displayMode: 'transient',
        });
      }

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
    }
  }

  return layoutHreaderSaveActoionChain;
});
