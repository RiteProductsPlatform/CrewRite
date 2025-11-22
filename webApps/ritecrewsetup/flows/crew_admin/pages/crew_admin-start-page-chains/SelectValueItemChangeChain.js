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

  class SelectValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      if(data){
      $variables.crewApplicationControlObj.p_element_entry_id = data.ElementEntryId;
      $variables.crewApplicationControlObj.p_element_type_id = data.ElementTypeId;
      $variables.crewApplicationControlObj.p_entry_sequence = data.EntrySequence;
      $variables.crewApplicationControlObj.p_entry_type = data.EntryType;
      $variables.crewApplicationControlObj.p_creator_type = data.CreatorType;
      }
    }
  }

  return SelectValueItemChangeChain;
});
