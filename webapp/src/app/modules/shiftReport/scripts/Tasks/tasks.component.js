(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('tasks', {
            bindings: {
                
            },
            controller: tasksCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/Tasks/tasks.template.html'
        });

    function tasksCtrl() {
        var ctrl = this;

        ctrl.$onInit = function() {
            ctrl.tasks = [];
            var n = 5;
            for (var i = 0; i < n; i++)
                ctrl.tasks.push({
                    content: "",
                    checked:false
                });

            ctrl.title = "משימות ממנהל החנות";
           
        }

    }
})();
