(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('conclusions', {
            bindings: {
                conclusions:"="
            },
            controller: conclusionsCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/Conclusions/conclusions.template.html'
        });

    function conclusionsCtrl() {
        var ctrl = this;

        ctrl.$onInit = function() {
            
            var n = 5;
            for (var i = 0; i < n; i++)
                ctrl.conclusions.push({
                    note: "",
                    assignedTo: "",
                    checked:false
                });


            ctrl.title = "הערות ומסקנות מהמשמרת";
            
            ctrl.teamOptions = [
                "מחלקת חנות",
                "מחלקת ספקים",
                "צוות כוח אדם",
                "מחלקת חברים",
                "הצוות כלכלי-משפטי",
                "אחראי pose",
                "אחראי google docs",
                "לא יודע"
            ];
        }
    }
})();
