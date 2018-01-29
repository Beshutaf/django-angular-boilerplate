(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('tasks', {
            bindings: {
                tasks:"="
            },
            controller: tasksCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/Tasks/tasks.template.html'
        });

//TODO: add option to add more tasks

    function tasksCtrl() {
        var ctrl = this;

        ctrl.$onInit = function() {
            
            var n = 5;
            for (var i = 0; i < n; i++)
                ctrl.tasks.push({
                    comment: "",
                    done:false
                });

            ctrl.title = "משימות ממנהל החנות";
           
        }

    }
})();
