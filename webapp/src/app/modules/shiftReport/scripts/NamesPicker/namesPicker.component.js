(function () {
    'use strict';
    
    angular
        .module('app.shiftReport')
        .directive('namesPicker', namesPickerDirective);
        
        
        //  {
        //     bindings: {
        //         apiPath:"<",
        //         selectedNames:"<",
        //         pickerId :"<"
        //     },
        //     controller: namesPickerCtrl,
        //     templateUrl: '/app/modules/shiftReport/scripts/NamesPicker/namesPicker.template.html'
        // }
        
         
        
        function namesPickerDirective (){
            console.log("directive");
            return {
                restrict:'EA',
                templateUrl:'/app/modules/shiftReport/scripts/NamesPicker/namesPicker.template.html',
                scope: {
                    apiPath:"<",
                    selectedNames:"<"
                },
                link:link
            };
            
            
            function link(scope, element, attrs){
                angular.element(element).select2({
                    placeholder: "הכנסי שם של חברה",
                    minimumInputLength : 2,
                    allowClear : true,
                    dir:"rtl",
                    ajax: {
                        url: scope.apiPath,    
                        data: function (params) {
                            var query = {
                                term:params.term,
                                format:"json"
                                }
                                // Query parameters will be ?search=[term]&type=public
                                return query;
                        },
                        processResults: function (data) {
                            console.log(data)
                            // Tranforms the top-level key of the response object from 'items' to 'results'
                            return {
                                results: data
                                };
                        },
                        cache: true
                    },
                    language: {
                        // You can find all of the options in the language files provided in the
                        // build. They all must be functions that return the string that should be
                        // displayed.
                        inputTooShort: function () {
                            return "הכנסי 2 תווים לפחות";
                        }
                    }
                    
                });
                
            }
            
            
            // var ctrl = this;
            
            // ctrl.searchNames = searchNames;
            // ctrl.removeName = removeName;
            
            // ctrl.$onInit = function(){
            //     ctrl.queryOptions = {
            //         query: function (query) {
            //             var data = {
            //                 results: [
            //                         { id: "1", text: "A" },
            //                         { id: "2", text: "B" }
            //                     ]
            //                 };
            //             query.callback(data);
            //             }
            //     };
                
                
            
                
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
            // }
                      
            // ctrl.$onChange = function (changes){}
            
            // function searchNames(term){
            //     var params = {
            //         term:term,
            //         format:"json"
            //     };
            //     return $http.get(ctrl.apiPath, {params: params})
            //     .then(function(response) {
            //         ctrl.data.names = ["gali", "daniel"];
            //     })
            // }
            
            // function removeName(nameToRemove){
            //     var index = ctrl.data.selectedNames.indexOf(nameToRemove)
            //     if (index > -1){
            //         ctrl.data.selectedNames.splice(index,1);
            //     }
            // }
        }
})();