(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('artistsLoaded', ArtistsLoaded)
  ;

  function ArtistsLoaded() {
    return function(scope) {
        if (scope.$last) {
            scope.$emit('artistsLoaded');
        }
    };
  }
})();