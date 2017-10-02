(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('cacheIO', {
            bindings: {
                title: "=",
                quantities: "="
            },
            controller: cacheIOCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/Cache/CacheIO/cacheIO.template.html'
        });

    function cacheIOCtrl() {
        var ctrl = this;
        
        ctrl.number = 5;
        ctrl.getNumber = function(num) {
            return new Array(num);
        }

    }

})();
