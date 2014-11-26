(function () {
  'use strict';

  angular
    .module('app.demo')
    .config(routerConfig);

  routerConfig.$inject = ['$stateProvider'];

  function routerConfig($stateProvider) {

    $stateProvider

      .state('artists', {
        url: "/",
        templateUrl: 'app/modules/demo/tpl/artists.html',
        controller: 'ArtistsCtrl as vm',
        resolve: {
          ArtistService: 'ArtistService'
        }
      })
    ;
  }
})();