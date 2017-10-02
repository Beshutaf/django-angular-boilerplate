(function () {
  'use strict';

  angular
    .module('app.shiftReport')
    .controller('ShiftReportCtrl', ShiftReportCtrl);
    
    ShiftReportCtrl.$inject=['$scope', 'constants', '$http']

  function ShiftReportCtrl($scope, constants, $http) {
    
    $scope.addMissingProduct = addMissingProduct;
    $scope.removeMissingProduct = removeMissingProduct;
    
    moment.locale('he');
    
    $scope.newMembers = [];
    $scope.leftMembers = [];
    $scope.newMembersTitle = "מצטרפים חדשים";
    $scope.leftMembersTitle = "חברים שעזבו";
    $scope.newMembersLink="https://docs.google.com/forms/d/e/1FAIpQLScLwyRApEifTXIxasjY_fVe2DPuPiJdh5mqeMuO9DZ9O5nLQw/viewform?c=0&w=1";
    $scope.leftMembersLink="https://docs.google.com/forms/d/e/1FAIpQLSeT_Oz2gTdAzE5-BgTwL5EUAUYFAidj12AIjyHs7C_UOAMPeg/viewform?c=0&w=1&usp=send_form";
    

    $scope.report = {};
    
    $scope.save= save;
    
    $scope.report.products = {
      missingProducts:[]
    }
    
    
    function addMissingProduct(productName) {
      $scope.report.products.missingProducts.push(productName);
      $scope.productName ="";
    }
    
    function removeMissingProduct(productName) {
      var index = $scope.report.products.missingProducts.indexOf(productName)
      if (index > -1){
        $scope.report.products.missingProducts.splice(index,1);
      }
    }
    
    function save(){
      console.log("save");
    }
    
  }
  
})();