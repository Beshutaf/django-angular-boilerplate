(function () {
  'use strict';

  angular
    .module('app.demo')
    .controller('DemoCtrl', DemoCtrl)
  ;

  function DemoCtrl() {
    var vm = this;

    vm.msg = 'If you can read this, something went right';
  }
})();