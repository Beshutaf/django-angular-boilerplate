(function () {
    'use strict';

    angular
        .module('app', [
            // app modules
            'app.demo',
            'app.shiftReport',
            'ngRoute',
            'ui.select',
            'ngSanitize'
            // '$http'
        ]);
})();