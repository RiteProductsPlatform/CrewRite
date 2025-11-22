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

  class CopyBtnAddAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const totalhoursCalculator = await $functions.totalhoursCalculator($variables.AddRowData);

      $variables.AddRowData = totalhoursCalculator;

     const maxid= await $functions.getmaxheaderid(JSON.stringify($variables.AddTimeSheetADP.data));

      $variables.AddRowData.iscopy = true;
      $variables.AddRowData.crew_setup_lines_rownum = maxid;

      await Actions.fireDataProviderEvent(context, {
        target: $variables.AddTimeSheetADP,
        add: {
          data: $variables.AddRowData,
        },
      });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.AddTimeSheetADP,
        refresh: null,
      });

      await Actions.callComponentMethod(context, {
        selector: '#timesDialog',
        method: 'close',
      });
    }
  }

  return CopyBtnAddAction;
});
