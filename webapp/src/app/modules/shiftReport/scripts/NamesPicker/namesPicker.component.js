(function () {
    'use strict';
    
    angular
        .module('app.shiftReport')
        .directive('namesPicker', namesPickerDirective);
       
       
        
        function namesPickerDirective (){
            
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
            
        }
})();