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

  class CheckInActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      await $functions.startTimer();

      const currentDateTime1 = await $functions.getCurrentDateTime1();

      if (!$variables.userLoginDetail.CheckIn) {
        $variables.userLoginDetail.CheckIn = currentDateTime1;
      }

      $variables.isCheckin = true;

      const location = await Actions.geolocation(context, {
      });

      $variables.userLoginDetail.UserName = $application.user.username;
      
     $variables.userLoginDetail.UserLocation= await $functions.getLocation(location.coords.latitude, location.coords.longitude);
   
    }
  }

  return CheckInActionChain;
});
