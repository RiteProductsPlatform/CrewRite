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

  class searchButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validateGroup = await $functions.validateGroup('combinationValidation');

      if (validateGroup === 'valid') {

        await Actions.resetVariables(context, {
          variables: [
    '$variables.combinationsTableADP',
    '$variables.timeEntriesTableADP',
    '$variables.resourceTableADP',
    '$variables.combinationLOV',
    '$variables.disableFlag',
    '$variables.resourceLOVADP',
  ],
        });

        const response2 = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_CrewResources',
          uriParams: {
            'p_crewsetup_id': $variables.headerobj.setupId,
          },
        });

        $variables.resourceTableADP.data = response2.body.items;
        $variables.timeEntriesTableADP.data = response2.body.items;
        $variables.resourceLOVADP.data = response2.body.items;

        const response = await Actions.callRest(context, {
          endpoint: 'CrewRite_ORDS/getCrewRite_TimeEntryCombinations',
          uriParams: {
            'p_crewsetup_id': $variables.headerobj.setupId,
          },
        });

        const insertCombination = await this.insertCustomCombination(context, { rows: response.body.items });

        $variables.combinationsTableADP.data = response.body.items;
        $variables.combinationLOV.data = insertCombination;
        $variables.disableFlag = false;
      }
    }

    /**
     * @param {Object} context
     */
    async insertCustomCombination(context,{rows}) {
      const { $page, $flow, $application, $constants, $variables } = context;
      let finalArr;
      let pushObj = {
            "combination_name": "Custom",
            "project": null,
            "task_date": null,
            "shift": null,
            "location_tax_jurisdiction": null,
            "work_package": null,
            "department": null,
            "cost_category": null,
            "time_type": null,
            "hours": null,
            "actions": null,
            "attribute1": null,
            "attribute2": null,
            "attribute3": null,
            "attribute4": null,
            "attribute5": null,
            "attribute6": null,
            "attribute7": null,
            "attribute8": null,
            "attribute9": null,
            "attribute10": null,
            "created_by": null,
            "creation_date": null,
            "last_updated_by": null,
            "last_update_date": null,
            "combination_id": 999999,
            "crewsetup_id": rows[0].crewsetup_id,
            "crew_name": rows[0].crew_name,
            "project_id": null,
            "project_number": null,
            "task_id": null,
            "task_number": null,
            "task_name": null,
            "start_date": null,
            "end_date": null
    };

        finalArr = [...rows, pushObj];
        return finalArr;
    }
  }

  return searchButtonActionChain;
});
