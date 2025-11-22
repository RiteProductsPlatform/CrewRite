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

  class SearchButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_TimeEntryCrew',
        uriParams: {
          'p_crew_name': $variables.headerObj.crewName,
        },
      });
      
      const visibleColumns = await $functions.getVisibleColumns([
    {
        "headerText": "Employee Name",
        "field": "resource_name"
    },
    {
        "headerText": "project_number",
        "field": "project_number"
    },
    {
        "headerText": "layout_name",
        "field": "layout_name"
    },
    // {
    //     "headerText": "field_label",
    //     "field": "field_label"
    // },
    // {
    //     "headerText": "crewsetup_id",
    //     "field": "crewsetup_id"
    // },
    {
        "headerText": "crew_name",
        "field": "crew_name"
    },
    {
        "headerText": "Shift",
        "field": "attribute1"
    },
    {
        "headerText": "Location",
        "field": "attribute2"
    },
    {
        "headerText": "Work Wage",
        "field": "attribute3"
    },
    {
        "headerText": "attribute4",
        "field": "attribute4"
    },
    {
        "headerText": "attribute5",
        "field": "attribute5"
    },
    {
        "headerText": "attribute6",
        "field": "attribute6"
    },
    {
        "headerText": "attribute7",
        "field": "attribute7"
    },
    {
        "headerText": "attribute8",
        "field": "attribute8"
    },
    {
        "headerText": "attribute9",
        "field": "attribute9"
    },
    {
        "headerText": "attribute10",
        "field": "attribute10"
    }
], response.body.items);

      $variables.Columns = visibleColumns;
      $variables.tableAdp.data  =response.body.items;

     
    }
  }

  return SearchButtonActionChain;
});
