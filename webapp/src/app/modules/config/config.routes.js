(function () {
  'use strict';

  angular
    .module('app.config')
    .config(routerConfig);

  routerConfig.$inject = ['$urlRouterProvider', '$locationProvider'];

  function routerConfig($urlRouterProvider, $locationProvider) {

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    $urlRouterProvider.when("", "/");
    $urlRouterProvider.when("/", "/");

    // if none of the above states are matched, use this as the fallback

    // issue with continuous loop see https://github.com/angular-ui/ui-router/issues/1022
    //$urlRouterProvider.otherwise('/artists');

    $urlRouterProvider.otherwise(function ($injector) {
      var $state = $injector.get('$state');
      $state.go('artists');
    });
  }
})();