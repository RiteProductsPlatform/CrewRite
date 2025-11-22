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

  class ButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      const currentDateTime = await $functions.getCurrentDateTime();
      $variables.checkDetails.checkOut = currentDateTime;
      const timeDifference = await $functions.timeDifference($variables.checkDetails.checkIn, $variables.checkDetails.checkOut);
      $variables.checkDetails.worktotal = timeDifference;
      let checkInList=[];
      checkInList.push($variables.checkDetails);

      $variables.crewChkADP.data = checkInList;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.checkDetails',
    '$page.variables.locationDtls',
  ],
      });
    }
  }

  return ButtonActionChain1;
});
