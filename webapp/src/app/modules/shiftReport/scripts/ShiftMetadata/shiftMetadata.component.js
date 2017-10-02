(function () {
    'use strict';
    
    angular
        .module('app.shiftReport')
        .component('shiftMetadata', {
            bindings: {
                
            },
            controller: shiftMetadataCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/ShiftMetadata/shiftMetadata.template.html'
        });

        // shiftMetadataCtrl.$inject=['shiftMetadataCtrl'];

        function shiftMetadataCtrl ($http){
            var ctrl = this;
            
            //////////////////////////////////
            
            // ctrl.addWorker = addWorker;
            // ctrl.removeWorker = removeWorker;
            // ctrl.addShiftLeader = addShiftLeader;
            // ctrl.removeShiftLeader = removeShiftLeader;
            
            /////////////////////////////////
            ctrl.reportMetadata = {
                    todayDate : moment().format("YYYY-MM-DD"),
                    day: moment().format('dddd'),
                    shiftLeaders:[],
                    shiftWorkers:[]
            }

            $http.get('shifts/'+moment(ctrl.reportMetadata.todayDate).format("YYYY/MM/DD")).then(function(res){
                console.log(res);
            })
            /////////////////////////////////
            
            //todo make component for name picking, diffrent source for workers and shift leaders
            // function addWorker(workerName){
            //     ctrl.reportMetadata.shiftWorkers.push(workerName);
            //     ctrl.workerName ="";
            // }
            
            // function removeWorker(workerName){
            //     var index = ctrl.reportMetadata.shiftWorkers.indexOf(workerName)
            //     if (index > -1){
            //         ctrl.reportMetadata.shiftWorkers.splice(index,1);
            //     }
            // }
            
            // function addShiftLeader(shiftLeaderName){
            //     ctrl.reportMetadata.shiftLeaders.push(shiftLeaderName);
            //     ctrl.shiftLeaderName = "";
            // }

            // function removeShiftLeader(shiftLeaderName){
            //     var index = ctrl.reportMetadata.shiftLeaders.indexOf(shiftLeaderName)
            //     if (index > -1){
            //         ctrl.reportMetadata.shiftLeaders.splice(index,1);
            //     }
            // }
        }
})();