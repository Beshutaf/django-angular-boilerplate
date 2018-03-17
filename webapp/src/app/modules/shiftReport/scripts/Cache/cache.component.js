(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('cache', {
            bindings: {
                cache:"<"
            },
            controller: cacheCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/Cache/cache.template.html'
        });

    function cacheCtrl() {
        var ctrl = this;
        
        ctrl.$onChanges = function(changes) {
            console.log(changes);
        }
        
        ctrl.cacheInputTitle = "כסף שנכנס לקופה - לא ממכירה או מיחידות";
        ctrl.cacheOutputTitle = "כסף שיצא מהקופה";
        ctrl.moneyAtStart = "כסף בתחילת המשמרת";
        ctrl.changeLeft = "עודף למשמרת הבאה";
    //   ctrl.cacheInput = new Array(5);
        // ctrl.cacheOutput = new Array(5);
        
        ctrl.totalFromSealingProducts = 0;
        
        ctrl.totalInCacheFromSealingSubstraction = totalInCacheFromSealingSubstraction;
        ctrl.totalInCacheFromSealingAddition = totalInCacheFromSealingAddition;
        
        function totalInCacheFromSealingSubstraction (value){
            ctrl.totalFromSealingProducts = ctrl.totalFromSealingProducts - value;
        }
        
        function totalInCacheFromSealingAddition (value){
            ctrl.totalFromSealingProducts = ctrl.totalFromSealingProducts + value;
        }

    }

})();
