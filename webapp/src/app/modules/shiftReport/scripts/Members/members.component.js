(function () {
    'use strict';
    
    angular
        .module('app.shiftReport')
        .component('members', {
            bindings: {
                title : '<',
                membersList : '=',
                panelColor: '<',
                link:'<'
            },
            controller: membersCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/Members/members.template.html'
        });
        
        function membersCtrl (){
            var ctrl = this;
            
            ctrl.addMember = addMember;
            ctrl.removeMember = removeMember;
            
            function addMember(memberName) {
                ctrl.membersList.push(memberName);
                $scope.memberName = "";
            }
            
            function removeMember(memberName){
                var index = ctrl.membersList.indexOf(memberName)
                if (index > -1){
                    ctrl.membersList.splice(index,1);
                }
            }
            
        }
        
})();