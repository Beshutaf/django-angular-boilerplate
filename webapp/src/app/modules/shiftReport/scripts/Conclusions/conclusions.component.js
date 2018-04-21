(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('conclusions', {
            bindings: {
                conclusions:"<"
            },
            controller: conclusionsCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/Conclusions/conclusions.template.html'
        });

    function conclusionsCtrl() {
        var ctrl = this;
        
        
         ctrl.$onChanges = function(changes) {
            if (changes.conclusions.currentValue) {
                if (changes.conclusions.currentValue.length ==0) {
                    var n = 5;
                    for (var i = 0; i < n; i++)
                        ctrl.conclusions.push({
                            comment: "",
                            assigned_team: "",
                            done:false
                        });
                }
            }
        }
        
        
        ctrl.$onInit = function() {
            if (angular.isUndefined(ctrl.conclusions) ){
                ctrl.conclusions = [];
            
                var n = 5;
                for (var i = 0; i < n; i++)
                    ctrl.conclusions.push({
                        comment: "",
                        assigned_team: "",
                        done:false
                    });
            }

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
