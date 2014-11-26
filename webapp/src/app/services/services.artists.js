(function () {
  'use strict';

  angular
    .module('app.services')
    .service('ArtistService', ArtistService)
  ;

  function ArtistService() {
    return {
      all: function () {
        return [
          {id: 1, name: 'David Bowie'},
          {id: 2, name: 'The Beatles'},
          {id: 3, name: 'Elvis Costello'},
          {id: 4, name: 'Bob Dylan'},
          {id: 5, name: 'Daft Punk'},
          {id: 6, name: 'Kruder and Dorfmeister'}
        ];
      }
    };
  }
})();