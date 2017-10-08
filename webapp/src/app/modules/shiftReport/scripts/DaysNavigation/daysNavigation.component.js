(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('daysNavigation', {
            bindings: {
                shiftDate: "="
            },
            controller: daysNavigationCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/DaysNavigation/daysNavigation.template.html'
        });

    function daysNavigationCtrl($http, shiftService) {
        var ctrl = this;

        ctrl.$onInit = function() {
            ctrl.getNextDay = getNextDay;
            ctrl.getPrevDay = getPrevDay;
        }

        function getNextDay() {
            var nextDay = moment(ctrl.shiftDate, 'DD-MM-YYYY').add(1, 'day').format('DD-MM-YYYY');
            ctrl.shiftDate = angular.copy(nextDay);
            shiftService.getShiftData(nextDay);
            console.log("Next day");
            console.log(nextDay);
        }

        function getPrevDay() {
            var prevDay = moment(ctrl.shiftDate, 'DD-MM-YYYY').subtract(1, 'day').format('DD-MM-YYYY');
            ctrl.shiftDate = angular.copy(prevDay);
            shiftService.getShiftData(prevDay);
            console.log("Prev Day");
            console.log(prevDay);
        }
    }
})();
