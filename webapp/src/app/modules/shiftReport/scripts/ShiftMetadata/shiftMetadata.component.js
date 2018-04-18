(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('shiftMetadata', {
            bindings: {
                shiftDate: "<",
                members:"<"
            },
            controller: shiftMetadataCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/ShiftMetadata/shiftMetadata.template.html'
        });

    function shiftMetadataCtrl(shiftService) {
        var ctrl = this;

        /////////////////////////////////
        ctrl.$onChanges = function(changes) {
            if (changes.shiftDate) {
                if (angular.isDefined(ctrl.reportMetadata)) {
                    ctrl.reportMetadata.day = moment(changes.shiftDate.currentValue, 'DD-MM-YYYY').format('dddd');
                    ctrl.reportMetadata.date = changes.shiftDate.currentValue;
                }
            }
            if (changes.members) {
                if (angular.isDefined(changes.members.currentValue)){
                    if (changes.members.currentValue.length > 0){
                        mapMemebers();
                    }    
                }
            }
        };

        ctrl.$onInit = function() {
            ctrl.shiftDate = ctrl.shiftDate ? ctrl.shiftDate : moment().format("DD-MM-YYYY");
            ctrl.reportMetadata = {
                date: ctrl.shiftDate,
                day: moment(ctrl.shiftDate, 'DD-MM-YYYY').format('dddd'),
                shiftLeaders: [[],[],[]],
                shiftWorkers: [[],[],[]]
            }
            ctrl.shifts = ["1", "2", "3"]
        };

        function mapMemebers(){
            angular.forEach(ctrl.members, function(membersData){
                if (membersData.role === "leader"){
                    ctrl.reportMetadata.shiftLeaders[membersData.shift_number-1].push(membersData.member)
                }
                if (membersData.role == "worker"){
                    ctrl.reportMetadata.shiftWorkers[membersData.shift_number-1].push(membersData.member)
                }
                
            })
        
        }
        
        
        /////////////////////////////////
        // [{
        //                 member: "firstname1 lastname1",
        //                 role: "leader",
        //                 shift_number: 1
        //             },
        //             { 
        //                 member: "firstname2 lastname2",
        //                 role: "worker",
        //                 shift_number: 1
        //             },
        //             {
        //                 member: "firstname3 lastname3",
        //                 role: "leader",
        //                 shift_number: 2
        //             },
        //             {
        //                 member: "firstname4 lastname4",
        //                 role: "worker",
        //                 shift_number: 2
        //             },
        //             {
        //                 member: "firstname5 lastname5",
        //                 role: "leader",
        //                 shift_number: 3
        //             },
        //             {
        //                 member: "firstname6 lastname6",
        //                 role: "worker",
        //                 shift_number: 3
        //             }
        //         ]

    }
})();
