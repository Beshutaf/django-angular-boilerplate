(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('money', {
            bindings: {
                title: "=",
                callback: "&",
                moneyDistribution:"<"
            },
            controller: moneyCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/Money/money.template.html'
        });

    moneyCtrl.$inject = ['constants']

    function moneyCtrl(constants) {
        var ctrl = this;

        ctrl.billsTypes = constants.getBillTypes;
        ctrl.calculateTotalMoney = calculateTotalMoney;

        ctrl.billAmount = [];
        
        ctrl.$onChanges = function (changes){
            if (changes.moneyDistribution) {
                if (changes.moneyDistribution.currentValue) {
                    calculateTotalMoney();   
                }
            }
        }
                
        function calculateTotalMoney() {
            console.log("something change");
            var total = 0;
            angular.forEach(ctrl.moneyDistribution, function (amount,coin){
                total += amount*coin;
                ctrl.callback({ value: total });
            } )
            ctrl.totalMoney = total;
            
        }
    }

})();
