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

    function shiftMetadataCtrl($http, shiftService) {
        var ctrl = this;

        /////////////////////////////////
        ctrl.$onChange = function(changes) {
            if (changes.shiftDate) {
                if (angular.isDefined(ctrl.reportMetadata)) {
                    ctrl.reportMetadata.day = moment(changes.shiftDate.currentValue, 'DD-MM-YYYY').format('dddd');
                    ctrl.reportMetadata.date = changes.shiftDate.currentValue;
                    getAndMapShiftData(ctrl.reportMetadata.date)   
                }
            }
        };

        ctrl.$onInit = function() {
            ctrl.reportMetadata = {
                date: ctrl.shiftDate,
                day: moment(ctrl.shiftDate, 'DD-MM-YYYY').format('dddd'),
                member_shifts: [{
                        member: "firstname1 lastname1",
                        role: "leader",
                        shift_number: "1"
                    },
                    { 
                        member: "firstname2 lastname2",
                        role: "worker",
                        shift_number: "1"
                    },
                    {
                        member: "firstname3 lastname3",
                        role: "leader",
                        shift_number: "2"
                    },
                    {
                        member: "firstname4 lastname4",
                        role: "worker",
                        shift_number: "2"
                    },
                    {
                        member: "firstname5 lastname5",
                        role: "leader",
                        shift_number: "3"
                    },
                    {
                        member: "firstname6 lastname6",
                        role: "worker",
                        shift_number: "3"
                    }
                ],
                shiftLeaders: {},
                shiftWorkers: {}
            }
            
            ctrl.shifts = ["1", "2", "3"]
        };

        
        function getAndMapShiftData(shiftDate){
            console.log("getAndMapShiftData")
            shiftService.getShiftData(shiftDate).then(function (res){
                        res = ctrl.reportMetadata;
                        angular.forEach(res.member_shifts, function(memberData){
                            if (memberData.role === "leader"){
                                ctrl.reportMetadat.shiftLeaders[memberData.shift_number].push(memberData.member)
                            }
                            if (memberData.role == "worker"){
                                ctrl.reportMetadat.shiftWorkers[memberData.shift_number].push(memberData.member)
                            }
                            
                        })
                    })
        }
        
        
        /////////////////////////////////

    }
})();
