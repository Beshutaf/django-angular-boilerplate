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
(function () {
  'use strict';

  angular.module('app.config', []);
})();
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
(function () {
  'use strict';

  angular.module('app.directives', []);
})();
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
(function () {
  'use strict';

  angular.module('app.services', []);
})();
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
(function () {
  'use strict';

  angular.module('app.demo', []);
})();
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
angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/modules/demo/tpl/artists.html',
    "<ul class=\"list-group\">\n" +
    "    <li class=\"list-group-item\" ng-repeat=\"artist in vm.artists\" ng-bind=\"artist.name\" artists-loaded></li>\n" +
    "</ul>\n" +
    "\n" +
    "<p class=\"well\" ng-show=\"vm.artistsLoaded\">If you can see this then the list of artists above has completed loading</p>"
  );

}]);
