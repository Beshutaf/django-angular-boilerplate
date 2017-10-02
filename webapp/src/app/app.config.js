(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config( $routeProvider) {
        configRoute($routeProvider);
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
        })();