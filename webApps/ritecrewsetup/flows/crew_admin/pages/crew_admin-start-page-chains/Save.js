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
'use strict';

  class Save extends ActionChain {
    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.showFields && $variables.ctype === 'CrewType') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_CrewType',
          responseType: 'create_CrewType',
          body: $variables.PostCrewType,
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostCrewType',
  ],
        });
      } else if ($variables.showFields && $variables.ctype === 'HoursType') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_HoursType',
          responseType: 'create_HoursType',
          body: $variables.PostHoursType,
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostHoursType',
  ],
        });
      } else if ($variables.showFields && $variables.ctype === 'EnableOt') {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_EnableOt',
          responseType: 'create_EnableOt',
          body: $variables.PostEnableOt,
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostEnableOt',
  ],
        });
      }else if ($variables.showFields && $variables.ctype === 'MasterData') {
          const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_MasterData',
          body: $variables.PostMasterData,
          responseType: 'create_MasterData',
        });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostMasterData',
  ],
        });
      }
      else if ($variables.showFields && $variables.ctype === 'RatesSource') {
          const response = await Actions.callRest(context, {
            endpoint: 'businessObjects/create_RatesSource',
            body: $variables.PostRatesSource,
            responseType: 'create_RatesSource',
          });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostRatesSource',
  ],
        });
      }else if ($variables.showFields && $variables.ctype === 'ResourceRoleNames') {
          const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_ResourceRoleNames',
          body: $variables.PostResourceRoleNames,
          responseType: 'create_ResourceRoleNames',
        });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostResourceRoleNames',
  ],
        });
      }else if ($variables.showFields && $variables.ctype === 'TableWeek') {
          const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_TableWeek',
          body: $variables.PostTableWeek,
          responseType: 'create_TableWeek',
        });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostTableWeek',
  ],
        });
      }
      else if ($variables.showFields && $variables.ctype === 'WeekDays') {
          const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_WeekDays',
          body: $variables.PostWeekDays,
          responseType: 'create_WeekDays',
        });

        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Saved',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostWeekDays',
  ],
        });
      }
       else {
        const response = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_ProjectContract',
          body: $variables.PostProjectContract,
          responseType: 'create_ProjectContract',
        });
        if (response.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Save',
            message: 'Successfully',
            type: 'confirmation',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Error',
            message: 'Insert Failed',
            type: 'error',
          });
        }

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.PostProjectContract',
  ],
        });
      }
    }
  }

  return Save;
});