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

  class AssignEquipmentSaveBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validateGroup = await $application.functions.validateGroup('AssignEquipGroup');

      if (validateGroup === 'valid') {
            await $functions.printLog($variables.addEquipObj);

      const dateFormatter = await $functions.dateFormatter($variables.addEquipObj.start_date, $variables.addEquipObj.end_date, $variables.addEquipObj.effective_start_date_copy, $variables.addEquipObj.effective_end_date_copy);

      const createAddEquipPayload = await $functions.createAddEquipPayload($variables.addEquipObj, dateFormatter.startDate, dateFormatter.endDate, dateFormatter.hstart, dateFormatter.hend);

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postCrewSetupAddEqup',
        body: createAddEquipPayload,
      });

      if (!response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Assign Equipment',
          displayMode: 'transient',
        });
      } else {

          const equipmentDialogClose = await Actions.callComponentMethod(context, {
            selector: '#EquipmentDialog',
            method: 'close',
          });

        await Actions.fireNotificationEvent(context, {
          summary: 'Equipment Assigned Successfully',
          displayMode: 'transient',
          type: 'confirmation',
        });
      }
    }
    }
  }

  return AssignEquipmentSaveBtnAction;
});
