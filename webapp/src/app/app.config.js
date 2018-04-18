(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$routeProvider','$httpProvider'];

    function config( $routeProvider, $httpProvider) {
        configRoute($routeProvider);
        httpConfig($httpProvider);
    }

    function configRoute($routeProvider) {
        var shiftReportOptions = {
            templateUrl: '/app/modules/shiftReport/partials/shiftReport.tpl.html',
            controller: 'ShiftReportCtrl'
        };
        
        var defaultOptions = {
                templateUrl: '/app/modules/demo/demo.tpl.html',
                controller: 'DemoCtrl'
            };
        
        $routeProvider
        .when('/shift_report', shiftReportOptions)
        .when('/demo',defaultOptions )
        .otherwise(shiftReportOptions);
   
    }
    
    function httpConfig($httpProvider){
        $httpProvider.defaults.xsrfCookieName = 'csrftoken'
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'
    }
})();