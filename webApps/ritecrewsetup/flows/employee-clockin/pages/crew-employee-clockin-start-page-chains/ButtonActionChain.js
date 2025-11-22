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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
        $variables.checkDetails.checkIn = $functions.getCurrentDateTime();

      $variables.checkDetails.checkInDate = $functions.getCurrentDate();

      $variables.checkDetails.empName = $application.user.email;

      let location = await Actions.geolocation(context, {

      });

      const location2 = await $functions.getLocation(location.coords.latitude, location.coords.longitude);

      $variables.locationDtls = location2;
      

      
    }
  }

  return ButtonActionChain;
});
