(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('daysNavigation', {
            bindings: {
                shiftDate: "=",
                getShiftData:"&"
                
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
            // shiftService.getShiftData(nextDay);
            ctrl.getShiftData({value:ctrl.shiftDate})
        }

        function getPrevDay() {
            var prevDay = moment(ctrl.shiftDate, 'DD-MM-YYYY').subtract(1, 'day').format('DD-MM-YYYY');
            ctrl.shiftDate = angular.copy(prevDay);
            // shiftService.getShiftData(prevDay);
            ctrl.getShiftData({value:ctrl.shiftDate})
        }
    }
})();
