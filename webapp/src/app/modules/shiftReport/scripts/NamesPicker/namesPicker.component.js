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
                    selectedNames:"=",
                    namesAdded : "&",
                    namesRemoved :"&",
                    shiftKey:"<",
                    role:"<",
                    maxSelectionLength:"<"
                },
                link:link
            };
            
            
            function link(scope, element, attrs){
                var selectElement = angular.element(element[0].getElementsByClassName("namePickerClass"));
                // if (angular.isDefined(scope.selectedNames)){
                //     if (scope.selectedNames.length != 0){
                       
                //     }
                // }
                /*
                * When loading selected names, iterate over the names and filter it according
                * to the element role and insert key to the object to mark it as selected.
                */
                console.log(scope.selectedNames);
                var preSelectedNames = [];
                if (scope.selectedNames.length > 0) {
                    scope.selectedNames.forEach(function(el) {
                       if (el.role == scope.role) {
                           var index = preSelectedNames.push(el);
                           preSelectedNames[index].selected = true;
                       } 
                    });
                }
                
                
                selectElement.select2(
                    {
                    placeholder: "הכנסי שם של חברה",
                    minimumInputLength : 2,
                    allowClear : true,
                    dir:"rtl",
                    maximumSelectionLength: scope.maxSelectionLength,
                    results:preSelectedNames,
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
                    
                });
                
                //update the model binding selectedNames when select event is fired
                selectElement.on('select2:select', function (e) {
                    scope.namesAdded({$name: e.params.data.text, $role: scope.role, $shiftKey: scope.shiftKey});
                });
                
                //update the model binding selectedNames when unselect event is fired
                selectElement.on('select2:unselect', function (e) {
                    scope.namesRemoved({$name: e.params.data.text, $role: scope.role, $shiftKey: scope.shiftKey});
                   
                    
                });
                
                
                
                scope.$watchCollection('selectedNames', function(newNames, oldNames) {
                    if (newNames.length ==0 && oldNames.length > 0) {
                       
                        $q.all(function(){
                                    
                            selectElement.select2(
                                {
                                    placeholder: "הכנסי שם של חברה",
                                    minimumInputLength : 2,
                                    allowClear : true,
                                    dir:"rtl",
                                    data : [],
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
                                    
                                });
                            
                        }());
                        
                        
                    }
                    if (newNames.length >0) {
                    
                        
                                var counter = 0;
                                var data = [];
                                angular.forEach(newNames, function (name){
                                    console.log(name);
                                    data.push({
                                        "id" :counter,
                                        "text": name,
                                        selected : true
                                    });
                                    counter++;
                                });
                                
                                $q.all(function(){
                                    
                            selectElement.select2(
                                {
                                    placeholder: "הכנסי שם של חברה",
                                    minimumInputLength : 2,
                                    allowClear : true,
                                    dir:"rtl",
                                    data : data,
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
                                    
                                });
                            
                        }());
                      
                    }
                });
            }
        }
})();