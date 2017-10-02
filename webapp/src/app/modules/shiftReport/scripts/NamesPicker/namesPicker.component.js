(function () {
    'use strict';
    
    angular
        .module('app.shiftReport')
        .component('namesPicker', {
            bindings: {
                apiPath:"=",
                selectedNames:"="
            },
            controller: namesPickerCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/NamesPicker/namesPicker.template.html'
        });
        
        namesPickerCtrl.$inject= ['$http'];
        
        function namesPickerCtrl ($http){
            var ctrl = this;
            
            ctrl.searchNames = searchNames;
            ctrl.removeName = removeName;
            
            ctrl.names = [];
  
            function searchNames(term){
                var params = {term:term};
                return $http.get(ctrl.apiPath, {params: params})
                .then(function(response) {
                    ctrl.names = response.data;
                })
            }
            
            function removeName(nameToRemove){
                var index = ctrl.selectedNames.indexOf(nameToRemove)
                if (index > -1){
                    ctrl.selectedNames.splice(index,1);
                }
            }
        }
})();