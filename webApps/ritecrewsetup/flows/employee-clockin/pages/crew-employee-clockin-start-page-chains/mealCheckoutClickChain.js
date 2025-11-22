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

  class mealCheckoutClickChain extends ActionChain {

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
      $variables.crewChkADP.data[current.index].mealChkout = chkinTime;
      let mchk = current.item.data.mealChkin;
      let mchk2 = chkinTime;

      const timeDifference = await $functions.timeDifference(mchk, mchk2);

      $variables.crewChkADP.data[current.index].mealtotal = timeDifference;
    }
  }

  return mealCheckoutClickChain;
});
