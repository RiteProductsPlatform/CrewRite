define([], () => {
  'use strict';

  class PageModule {
    specificationArray() {
      let payload = [
        {
          "value": "Day"
        },
        {
          "value": "Week"
        }];
      return payload;
    }
  }

  return PageModule;
});
