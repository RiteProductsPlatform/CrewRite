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

  class mealClickChain extends ActionChain {

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

      $variables.crewChkADP.data[current.index].mealChkin = chkinTime;

      await $functions.startTimer('m'+ current.index);
    }
  }

  return mealClickChain;
});
