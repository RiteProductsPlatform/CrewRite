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

  class ButtonActionChain2 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.ctype === 'CrewType') {
        $variables.columnNames =[{
          "headerText":"Crew Type",
          "field":"CrewType"
        },{
          "headerText":"Crew Scope",
          "field":"CrewScope"
        },
        {
          "headerText":"Time Entry Method",
          "field":"TimeEntryMethod"
        }
        ];
      }
    }
  }

  return ButtonActionChain2;
});
