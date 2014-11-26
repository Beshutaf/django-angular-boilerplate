(function () {
  'use strict';

  angular
    .module('app', [
      // Angular modules
      'ngAnimate',

      // 3rd party modules
      'ui.router',

      // app modules
      'app.config',
      'app.services',
      'app.directives',
      'app.demo'
    ]);
})();