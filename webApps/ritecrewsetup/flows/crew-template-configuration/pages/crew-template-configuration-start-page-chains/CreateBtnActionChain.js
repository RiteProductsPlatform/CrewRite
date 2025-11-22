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

  class CreateBtnActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;
     

      await Actions.resetVariables(context, {
        variables: [
    '$variables.templatesMap_copy',
    '$variables.templatesMap',
    '$variables.templateADP.data',
    '$variables.tempHeader',
  ],
      });

      await Actions.callChain(context, {
        chain: 'addRowDtls',
      });

      const ojDialog10446442961Open = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-1044644296-1',
        method: 'open',
      });
    }
  }

  return CreateBtnActionChain;
});
