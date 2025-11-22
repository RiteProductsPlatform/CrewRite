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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      

      const response2 = await Actions.callRest(context, {
        endpoint: 'CrewRite_ORDS/getCrewRite_TimeEntryCrew',
      });

      const visibleColumns = await $functions.getVisibleColumns([
    {
        "headerText": "Employee Name",
        "field": "resource_name"
    },
    {
        "headerText": "Project Number",
        "field": "project_number"
    },
    {
        "headerText": "Layout Name",
        "field": "layout_name"
    },
    // {
    //     "headerText": "Field Label",
    //     "field": "field_label"
    // },
    // {
    //     "headerText": "Crewsetup Id",
    //     "field": "crewsetup_id"
    // },
    {
        "headerText": "Crew Name",
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
], undefined);
      $variables.Columns = visibleColumns;
      $variables.tableAdp.data = response2.body.items;
      const cols=  await $functions.getColumns();
      $variables.columnsArray = cols;
    }
  }

  return PageVbEnterChain;
});
