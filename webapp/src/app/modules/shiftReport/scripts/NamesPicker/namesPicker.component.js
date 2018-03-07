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
                    selectedNames:"="
                },
                link:link
            };
            
            
            function link(scope, element, attrs){
                var selectElement = angular.element(element);
                selectElement.select2({
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
                
                //udate the select element with the data
                selectElement.append(scope.selectedNames).trigger('change');
                
                //update the model binding selectedNames when select event is fired
                selectElement.on('select2:select', function (e) {
                    scope.selectedNames.push(e.params.data);
                    var data = e.params.data;
                    console.log(data);
                });
                
                //udate the model binding selectedNames when unselect event is fired
                selectElement.on('select2:unselect', function (e) {
                    var data = e.params.data;
                    console.log(data);
                    var index = scope.selectedNames.indexOf(data)
                    if (index > -1){
                        scope.selectedNames.membersList.splice(index,1);
                    }
                });
                
            }
            
        }
})();