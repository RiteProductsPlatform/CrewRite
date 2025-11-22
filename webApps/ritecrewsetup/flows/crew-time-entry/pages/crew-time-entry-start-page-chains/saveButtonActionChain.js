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

  class saveButtonActionChain extends ActionChain {

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

      const timeValidator = await $functions.timeValidator($variables.addEmpObj);

      if (timeValidator.isValid) {
        

// debugger;
        const saveEmployeeData = await $functions.saveEmployeeData($variables.addEmpObj, $application.user.username);

        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/postCrewRite_CrewSetupLines',
          body: saveEmployeeData,
        });

        if (response.ok) {
          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          const addEmployeeClose = await Actions.callComponentMethod(context, {
            selector: '#addEmployee',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'The employee record has been added successfully.',
            type: 'confirmation',
            displayMode: 'transient',
          });

          await Actions.callChain(context, {
            chain: 'TR_AddBtnAction_New',
          });

        }else{
          
          const loadingDialogClose2 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Add Employee',
            type: 'error',
            displayMode: 'transient',
            message: 'Please Contact System Administrator',
          });
        }
      }
    }
  }

  return saveButtonActionChain;
});
