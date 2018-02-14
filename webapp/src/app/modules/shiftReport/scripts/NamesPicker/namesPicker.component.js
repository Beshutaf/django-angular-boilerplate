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
        
        namesPickerCtrl.$inject= ['$http','$document'];
        
        function namesPickerCtrl ($http, $document){
            var ctrl = this;
            
            ctrl.searchNames = searchNames;
            ctrl.removeName = removeName;
            
            ctrl.$onInit = function(){
                ctrl.queryOptions = {
                    query: function (query) {
                        var data = {
                            results: [
                                    { id: "1", text: "A" },
                                    { id: "2", text: "B" }
                                ]
                            };
                        query.callback(data);
                        }
                };
                
                
            
                
                // console.log($('#'+ctrl.pickerId))
                // minimumInputLength: 1,
                //         ajax: {
                //             url: ctrl.apiPath,
                //             data: function (params) {
                //               var query = {
                //                 term:params.term,
                //                 format:"json"
                //               }
                //              // Query parameters will be ?search=[term]&type=public
                //               return query;
                //             },
                //             processResults: function (data) {
                //             // Tranforms the top-level key of the response object from 'items' to 'results'
                //               return {
                //                 results: data
                //               };
                //             },
                //             cache: true
                //         }
            }
                      
            ctrl.$onChange = function (changes){}
            
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