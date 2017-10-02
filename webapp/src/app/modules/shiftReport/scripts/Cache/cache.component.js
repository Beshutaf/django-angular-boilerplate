(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('cache', {
            bindings: {},
            controller: cacheCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/Cache/cache.template.html'
        });

    function cacheCtrl() {
        var ctrl = this;

        ctrl.cacheInputTitle = "כסף שנכנס לקופה - לא ממכירה או מיחידות";
        ctrl.cacheOutputTitle = "כסף שיצא מהקופה";
        ctrl.moneyAtStart = "כסף בתחילת המשמרת";
        ctrl.changeLeft = "עודף למשמרת הבאה";
        ctrl.cacheInput = new Array(5);
        ctrl.cacheOutput = new Array(5);
        
        ctrl.totalFromCellingProducts = 0;
        
        ctrl.totalInCacheFromCellingSubstraction = totalInCacheFromCellingSubstraction;
        ctrl.totalInCacheFromCellingAddition = totalInCacheFromCellingAddition;
        
        ctrl.updateTotalInCacheFromCelling = function (){
            
        }
        
        function totalInCacheFromCellingSubstraction (value){
            ctrl.totalFromCellingProducts = ctrl.totalFromCellingProducts - value;
        }
        
        function totalInCacheFromCellingAddition (value){
            ctrl.totalFromCellingProducts = ctrl.totalFromCellingProducts + value;
        }

    }

})();
