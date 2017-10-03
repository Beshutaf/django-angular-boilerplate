(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('daysNavigation', {
            bindings: {},
            controller: daysNavigationCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/DaysNavigation/daysNavigation.template.html'
        });

    function daysNavigationCtrl($http) {
        var ctrl = this;

        ctrl.$onInit = function() {
            
        }
        
        ctrl.getNextDay = getNextDay;
        ctrl.getPrevDay = getPrevDay;
        
        function getNextDay(){
            var todayDate = moment().format("YYYY-MM-DD"),
            $http.get()
            console.log("Next day");
        }
        
        function getPrevDay(){
            console.log("Prev Day");
        }
    }
})();
