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

  class addRowDtls extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
       $variables.templatesMap_copy.id = $variables.templateADP.data.length===0? 1 : $variables.templateADP.data.length + 1;
      await Actions.fireDataProviderEvent(context, {
        add: {
          data: $variables.templatesMap_copy,
          keys: $variables.templatesMap_copy.id,
        },
        target: $variables.templateADP,
      });
    }
  }

  return addRowDtls;
});
