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

  class CheckOutActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await $functions.stopTimer();

      $variables.isCheckin = false;

      const currentDateTime1 = await $functions.getCurrentDateTime1();

      $variables.userLoginDetail.CheckOut = currentDateTime1;

      const location = await Actions.geolocation(context, {
      });

      $variables.userLoginDetail.checkOutLocation = await $functions.getLocation(location.coords.latitude, location.coords.longitude);

      const timeDifference = await $functions.timeDifference($variables.userLoginDetail.CheckIn, $variables.userLoginDetail.CheckOut);

      $variables.userLoginDetail.TotalWorkHours = timeDifference;

      await Actions.fireNotificationEvent(context, {
        displayMode: 'transient',
        summary: 'Time Sheet Submitted Successfully',
        type: 'confirmation',
      });
    }
  }

  return CheckOutActionChain;
});
