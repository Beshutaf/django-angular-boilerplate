(function () {
    'use strict';
    
    angular
        .module('app.shiftReport')
        .directive('namesPicker', namesPickerDirective);
       
        namesPickerDirective.$inject=['$q'];
       
        
        function namesPickerDirective ($q){
            
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
                var selectElement = angular.element(element[0].getElementsByClassName("namePickerClass"));
                if (angular.isDefined(scope.selectedNames)){
                    if (scope.selectedNames.length != 0){
                        console.log(scope.selectedNames);
                    }
                }
                
                selectElement.select2(
                    {
                    placeholder: "הכנסי שם של חברה",
                    minimumInputLength : 2,
                    allowClear : true,
                    dir:"rtl",
                    // data:[{id:1, text:"Daniel"},{id:2, text:"gali paz"}],
                    // language : "he"
                    ajax: {
                        url: scope.apiPath, 
                        dataType: 'json',
                        delay: 250,
                        data: 
                        function (params) {
                            var query = {
                                term:params.term,
                                format:"json"
                                }
                                // Query parameters will be ?search=[term]&type=public
                                return query;
                        },
                        processResults: function (data) {
                            console.log(data)
                            // debugger;
                            return {results: data};
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
                    
                }
                );
                
                //udate the select element with the data
                // selectElement.append(scope.selectedNames).trigger('change');
                
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
                var outsideNamesLoaded  = false;
                scope.$watchCollection('selectedNames', function(newNames, oldNames) {
                    if (newNames.length >0) {
                        console.log(newNames);
                        outsideNamesLoaded = true;
                        
                        var counter = 0;
                        var data = [];
                        angular.forEach(newNames, function (name){
                            debugger;
                            data.push({
                                "id" :counter,
                                "text": name,
                                selected : true
                            });
                            counter++;
                        });
                        
                        $q.all(function(){
                            debugger;
                            console.log(data);
                            selectElement.select2(
                                {
                    placeholder: "הכנסי שם של חברה",
                    minimumInputLength : 2,
                    allowClear : true,
                    dir:"rtl",
                    data : data,
                    // data:[{id:1, text:"Daniel"},{id:2, text:"gali paz"}],
                    // language : "he"
                    ajax: {
                        url: scope.apiPath, 
                        dataType: 'json',
                        delay: 250,
                        data: 
                        function (params) {
                            var query = {
                                term:params.term,
                                format:"json"
                                }
                                // Query parameters will be ?search=[term]&type=public
                                return query;
                        },
                        processResults: function (data) {
                            console.log(data)
                            // debugger;
                            return {results: data};
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
                    
                }
                
                                
                                );
                        }());
                    }
                });
            }
        }
})();