(function () {
  'use strict';

  angular
    .module('app.demo')
    .controller('ArtistsCtrl', ArtistsCtrl)
  ;

  ArtistsCtrl.$inject = ['$scope', 'ArtistService'];

  function ArtistsCtrl($scope, artistService) {
    var vm = this;

    vm.artistsLoaded = false;

    vm.artists = artistService.all();

    // listen for message to be emitted by directive
    $scope.$on('artistsLoaded', function () {
      vm.artistsLoaded = true;
    });
  }
})
();