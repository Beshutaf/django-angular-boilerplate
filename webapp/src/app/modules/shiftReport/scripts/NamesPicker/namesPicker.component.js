(function () {
    'use strict';
    
    angular
        .module('app.shiftReport')
        .component('namesPicker', {
            bindings: {
                apiPath:"<",
                selectedNames:"<",
                pickerId :"<"
            },
            controller: namesPickerCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/NamesPicker/namesPicker.template.html'
        });
        
        namesPickerCtrl.$inject= ['$http'];
        
        function namesPickerCtrl ($http){
            var ctrl = this;
            
            ctrl.searchNames = searchNames;
            ctrl.removeName = removeName;
            
            ctrl.$onInit = function(){
                ctrl.data = {};
                console.log(ctrl.apiPath)
                console.log(ctrl.selectedNames)
            }
                      
            ctrl.$onChange = function (changes){
                // if (changes.apiPath){
                //     console.log(changes.apiPath.newValue)
                // }
                
                // if (changes.selectedNames){
                //     console.log(changes.selectedNames.newValue)
                // }
                console.log(changes)
                
            }
            ctrl.onSelectedCallback = function(item, model){
                console.log(item)
                console.log(model)
            }
            
            function searchNames(term){
                var params = {
                    term:term,
                    format:"json"
                };
                return $http.get(ctrl.apiPath, {params: params})
                .then(function(response) {
                    ctrl.data.names = ["gali", "daniel"];
                })
            }
            
            function removeName(nameToRemove){
                var index = ctrl.data.selectedNames.indexOf(nameToRemove)
                if (index > -1){
                    ctrl.data.selectedNames.splice(index,1);
                }
            }
        }
})();