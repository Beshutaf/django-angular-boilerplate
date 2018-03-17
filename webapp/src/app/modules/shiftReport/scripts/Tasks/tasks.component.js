(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('tasks', {
            bindings: {
                tasksObj:"<"
            },
            controller: tasksCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/Tasks/tasks.template.html'
        });

//TODO: add option to add more tasks

    function tasksCtrl() {
        var ctrl = this;
        
        ctrl.$onChanges = function(changes) {
            if (changes.tasksObj.currentValue) {
                if (changes.tasksObj.currentValue.length ==0) {
                    var n = 5;
                    for (var i = 0; i < n; i++)
                        ctrl.tasksObj.push({
                            comment: "",
                            done:false
                        });
                }
            }
        }
        
        ctrl.$onInit = function() {
            if (angular.isUndefined(ctrl.tasksObj) ){
                ctrl.tasksObj = [];
                var n = 5;
                for (var i = 0; i < n; i++)
                    ctrl.tasksObj.push({
                        comment: "",
                        done:false
                    });
            }
            ctrl.title = "משימות ממנהל החנות";
            console.log(ctrl.tasksObj)
           
        }

    }
})();
