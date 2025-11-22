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

  class FilePickerSelectChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object[]} params.files 
     */
    async run(context, { files }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.AdhocMainUITableADP',
    '$page.variables.AdhocMainUITableADP.data',
  ],
      });

      const excelProcessor = await $functions.excelProcessor(files[0]);

      $page.variables.AdhocMainUITableADP.data = excelProcessor;
    }
  }

  return FilePickerSelectChain;
});
