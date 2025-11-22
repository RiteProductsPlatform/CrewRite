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

  class SyncBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const settoArray = await $functions.settoArray($variables.selectedSyncFields);

      if (settoArray.presence.All) {

        await Actions.fireNotificationEvent(context, {
          summary: 'All',
        });
      } else {
        const results = await Promise.all([
          async () => {

            if (settoArray.presence.Project) {
              const response = await Actions.callRest(context, {
                endpoint: 'Project_Details/TROracleProjects',
              });

              if (!response.ok) {
                await Actions.fireNotificationEvent(context, {
                  summary: 'Failed to initiate Syncing of Project',
                  displayMode: 'transient',
                });

                return;
              } else {
                await Actions.fireNotificationEvent(context, {
                  summary: 'Sync Initiated for Projects Successfully',
                  displayMode: 'transient',
                  type: 'confirmation',
                });
              }
            }
          },
          async () => {
            if (settoArray.presence.ProjectDetails) {
              await Actions.fireNotificationEvent(context, {
                summary: 'Project Details',
              });
            }
          },
          async () => {
            if (settoArray.presence.ProjectTaskDetails) {
              const response2 = await Actions.callRest(context, {
                endpoint: 'Project_Details/TROracleProjectsTasks',
              });
              if (!response2.ok) {
                await Actions.fireNotificationEvent(context, {
                  summary: 'Failed to initiate Syncing of Project Task Details',
                  displayMode: 'transient',
                });

                return;
              } else {
                await Actions.fireNotificationEvent(context, {
                  summary: 'Sync Initiated for Project Task Details Successfully',
                  displayMode: 'transient',
                  type: 'confirmation',
                });
              }
            }
          },
          async () => {
            if (settoArray.presence.ProjectTeamMembers) {
              const response3 = await Actions.callRest(context, {
                endpoint: 'Project_Details/TROracleProjectsTeam',
              });
              if (!response3.ok) {
                await Actions.fireNotificationEvent(context, {
                  summary: 'Failed to initiate Syncing of Project Task Details',
                  displayMode: 'transient',
                });

                return;
              } else {
                await Actions.fireNotificationEvent(context, {
                  summary: 'Sync Initiated for Project Task Details Successfully',
                  displayMode: 'transient',
                  type: 'confirmation',
                });
              }
            }
          },
          async () => {
            if (settoArray.presence.TimeTypes) {
              await Actions.fireNotificationEvent(context, {
                summary: 'Time Types',
              });
            }
          },
          async () => {

            if (settoArray.presence.PayrollElements) {

              await Actions.fireNotificationEvent(context, {
                summary: 'Payroll Elements',
              });
            }
          },
        ].map(sequence => sequence()));
      }

    }
  }



  //     "Project",
  //     "ProjectDetails",
  //     "ProjectTaskDetails",
  //     "ProjectTeamMembers",
  //     "TimeTypes",
  //     "PayrollElements"
  return SyncBtnAction;
});
