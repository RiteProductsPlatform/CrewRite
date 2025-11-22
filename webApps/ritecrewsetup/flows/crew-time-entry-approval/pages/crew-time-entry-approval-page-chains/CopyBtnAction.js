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

  class CopyBtnAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application } = context;

      $page.variables.AddRowData = current.row;
      $page.variables.AddRowData.fri_in_time = "00:00";
      $page.variables.AddRowData.fri_out_time = "00:00";
      $page.variables.AddRowData.mon_in_time = "00:00";
      $page.variables.AddRowData.mon_out_time = "00:00";
      $page.variables.AddRowData.sat_in_time = "00:00";
      $page.variables.AddRowData.sat_out_time = "00:00";
      $page.variables.AddRowData.sun_in_time = "00:00";
      $page.variables.AddRowData.sun_out_time = "00:00";
      $page.variables.AddRowData.thu_in_time = "00:00";
      $page.variables.AddRowData.thu_out_time = "00:00";
      $page.variables.AddRowData.tue_in_time = "00:00";
      $page.variables.AddRowData.tue_out_time = "00:00";
      $page.variables.AddRowData.wed_in_time = "00:00";
      $page.variables.AddRowData.wed_out_time = "00:00";

      $page.variables.dialoguelabel = 'Copy';
      $page.variables.EditType = 'ADD';

      const callComponentMethodTimesDialogOpenResult = await Actions.callComponentMethod(context, {
        selector: '#timesDialog',
        method: 'open',
      });
    }
  }

  return CopyBtnAction;
});
