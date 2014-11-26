(function () {
  'use strict';

  angular
    .module('app.config')
    .config(appConfig)
    .run(bootstrap);

  appConfig.$inject = ['$httpProvider', '$provide'];
  bootstrap.$inject = ['$http', '$rootScope', '$state', '$stateParams'];

  function appConfig($httpProvider, $provide) {

    // prevent caching issues
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    // disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

    // see https://github.com/angular-ui/ui-router/issues/582
    // Bug in $state.reload() - resolves are refreshed, but Controller is not re-initialised
    $provide.decorator('$state', function ($delegate) {
      $delegate.reinit = function () {
        this.go('.', null, { reload: true });
      };
      return $delegate;
    });
  }

  function bootstrap($http, $rootScope, $state, $stateParams) {

    $http.defaults.headers.common['Cache-Control'] = 'no-cache';

    // see http://angular-ui.github.io/ui-router/sample/app/app.js
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
})();