(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('money', {
            bindings: {
                title: "=",
                callback: "&"
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

        function calculateTotalMoney() {
            var total = 0;
            var itemsProcessed = 0;
            ctrl.billAmount.forEach(function(element, index, array) {
                itemsProcessed ++;
                total += element * ctrl.billsTypes[index]
                if (itemsProcessed === array.length) {
                    ctrl.callback({ value: total });
                }
            })
            return total;
        }
    }

})();
