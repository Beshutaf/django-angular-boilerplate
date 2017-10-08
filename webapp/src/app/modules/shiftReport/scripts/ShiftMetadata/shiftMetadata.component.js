(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('shiftMetadata', {
            bindings: {
                shiftDate: "<"
            },
            controller: shiftMetadataCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/ShiftMetadata/shiftMetadata.template.html'
        });

    function shiftMetadataCtrl($http) {
        var ctrl = this;

        /////////////////////////////////
        ctrl.$onChanges = function(changes) {
            if (changes.shiftDate) {
                if (angular.isDefined(ctrl.reportMetadata)) {
                    ctrl.reportMetadata.day = moment(changes.shiftDate.currentValue, 'DD-MM-YYYY').format('dddd');
                    ctrl.reportMetadata.date = changes.shiftDate.currentValue;
                }
            }
        };

        ctrl.$onInit = function() {
            ctrl.reportMetadata = {
                date: ctrl.shiftDate,
                day: moment(ctrl.shiftDate, 'DD-MM-YYYY').format('dddd'),
                member_shifts:[
                    {},
                    {},
                    {}
                    ]
                shiftLeaders: [],
                shiftWorkers: []
            }
        }


        // $http.get('shifts/'+moment(ctrl.reportMetadata.todayDate).format("YYYY/MM/DD")).then(function(res){
        //     console.log(res);
        // })
        /////////////////////////////////

    }
})();
