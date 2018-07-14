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
            if (changes.cache) {
                if (angular.isDefined(ctrl.cache)) {
                    updateMoneyFromSales();    
                }
            }
        }
        
        ctrl.cacheInputTitle = "כסף שנכנס לקופה - לא ממכירה או מיחידות";
        ctrl.cacheOutputTitle = "כסף שיצא מהקופה";
        ctrl.moneyAtStartTitle = "כסף בתחילת המשמרת";
        ctrl.changeLeft = "עודף למשמרת הבאה";
    
        ctrl.totalMoneyAtStart = 0;
        ctrl.totalMoneyAtEnd = 0;
        
        
        ctrl.totalFromSaleProducts = ctrl.cache ? Number(ctrl.cache.money_from_cash) : 0;
        
        ctrl.updateMoneyFromSalesWhenMoneyAtStartChange = updateMoneyFromSalesWhenMoneyAtStartChange;
        ctrl.updateMoneyFromSalesWhenMoneyLeftInCacheChange = updateMoneyFromSalesWhenMoneyLeftInCacheChange;
        ctrl.updateMoneyFromSales = updateMoneyFromSales;
        
        function updateMoneyFromSalesWhenMoneyAtStartChange (value){
            ctrl.totalMoneyAtStart = value;
            updateMoneyFromSales();
        }
        
        function updateMoneyFromSalesWhenMoneyLeftInCacheChange (value){
            ctrl.totalMoneyAtEnd = value;
            updateMoneyFromSales();
        }
        
        function updateMoneyFromSales(){
            ctrl.totalFromSaleProducts = ctrl.cache.money_from_cash + ctrl.totalMoneyAtEnd - ctrl.totalMoneyAtStart;
             ctrl.totalFromSaleProducts =  ctrl.totalFromSaleProducts.toFixed(2);
        }

    }

})();
