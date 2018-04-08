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
        ctrl.moneyAtStartTile = "כסף בתחילת המשמרת";
        ctrl.changeLeft = "עודף למשמרת הבאה";
    
        ctrl.totalMoneyAtStart = 0;
        ctrl.totalMoneyAtEnd = 0;
        
        
        ctrl.totalFromSaleProducts = ctrl.cache ? ctrl.cache.money_from_cash : 0;
        
        ctrl.totalInCacheFromSaleSubstraction = totalInCacheFromSaleSubstraction;
        ctrl.totalInCacheFromSaleAddition = totalInCacheFromSaleAddition;
        ctrl.updateMoneyFromSales = updateMoneyFromSales;
        
        function totalInCacheFromSaleSubstraction (value){
            console.log("totalInCacheFromSealingSubstraction");
            ctrl.totalFromSaleProducts = ctrl.totalFromSaleProducts - value;
            console.log(ctrl.totalFromSaleProducts);
            ctrl.totalMoneyAtStart = value;
        }
        
        function totalInCacheFromSaleAddition (value){
            console.log("totalInCacheFromSealingAddition");
            ctrl.totalFromSaleProducts = ctrl.totalFromSaleProducts + value;
            console.log(ctrl.totalFromSaleProducts);
            ctrl.totalMoneyAtEnd = value;
        }
        
        function updateMoneyFromSales(){
            ctrl.totalFromSaleProducts = ctrl.cache.money_from_cash + ctrl.totalMoneyAtEnd - ctrl.totalMoneyAtStart;
            console.log(ctrl.totalFromSaleProducts);
        }

    }

})();
