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

  class TimeTblEditBeforeRowEdit extends ActionChain {
    
    async run(context, { cancelEdit, rowKey, rowIndex, rowData }) {
      const { $page, $flow, $application } = context;

     const editmarker =  await $page.functions.editRowMarker($page.variables.OriginalRowData, $page.variables.currentRowdata);

      if (editmarker) {
        $page.variables.currentRowdata.isRowEdited = true;

      } else {
        $page.variables.currentRowdata.isRowEdited = false;
      }

      await Actions.fireDataProviderEvent(context, {
        target: $page.variables.TimeSheetADP,
        update: {
          data: $page.variables.currentRowdata,
        },
      });
    }
  }

  return TimeTblEditBeforeRowEdit;
});
