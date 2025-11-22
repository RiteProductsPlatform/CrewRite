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

  class CheckOutspanClickChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const chkinTime = await $functions.getChkinTime();
      $variables.crewChkADP.data[current.index].checkOut = chkinTime;
      const timeDifference = await $functions.timeDifference(current.item.data.checkIn, chkinTime);
      $variables.crewChkADP.data[current.index].worktotal = timeDifference;

      
    }
  }

  return CheckOutspanClickChain;
});
