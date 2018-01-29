(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('missingProducts', {
            bindings: {
                productsList:"="
            },
            controller: missingProductsCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/MissingProducts/missingProducts.template.html'
        });

    function missingProductsCtrl() {
        var ctrl = this;

        ctrl.addMissingProduct = addMissingProduct;
        ctrl.removeProduct = removeProduct;
        
        /////////////////////////////////
        
        ctrl.title = "מוצרים שעומדים להיגמר או חסרים";
            
        function addMissingProduct(productName) {
            ctrl.productsList.push(productName);
            ctrl.productName = ""
        }
        
        function removeProduct(productName){
            var index = ctrl.productsList.indexOf(productName)
            if (index > -1){
                ctrl.productsList.splice(index,1);
            }
        }

    }
})();
