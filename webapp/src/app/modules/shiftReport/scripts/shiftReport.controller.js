(function () {
  'use strict';

  angular
    .module('app.shiftReport')
    .controller('ShiftReportCtrl', ShiftReportCtrl);
    
    ShiftReportCtrl.$inject=['$scope', 'constants', '$http', 'shiftService', '$window'];

  function ShiftReportCtrl($scope, constants, $http, shiftService, $window) {
    
    moment.locale('he');
    
    $scope.newMembers = [];
    $scope.leavingMembers = [];
    $scope.newMembersTitle = "מצטרפים חדשים";
    $scope.leftMembersTitle = "חברים שעזבו";
    $scope.newMembersLink="https://docs.google.com/forms/d/e/1FAIpQLScLwyRApEifTXIxasjY_fVe2DPuPiJdh5mqeMuO9DZ9O5nLQw/viewform?c=0&w=1";
    $scope.leftMembersLink="https://docs.google.com/forms/d/e/1FAIpQLSeT_Oz2gTdAzE5-BgTwL5EUAUYFAidj12AIjyHs7C_UOAMPeg/viewform?c=0&w=1&usp=send_form";
    
    
    
    $scope.report = {
      date:moment().format("DD-MM-YYYY"),
      members:[],
      newMembers:[],
      leavingMembers:[],
      tasks:[],
      conclusions[],
      missingProducts[],
      cache:{
        monyFromStocks:0,
        checks:0,
        cash:0,
        envalopeNumber:0,
        money:{
          moneyAtStart:{
            "1":0,
            "2":0'
            "5":0,
            "10":0,
            "20":0,
            "50":0,
            "100":0,
            "200":0
          },
          moneyAtEnd:{
            "1":0,
            "2":0'
            "5":0,
            "10":0,
            "20":0,
            "50":0,
            "100":0,
            "200":0
          }
        }
      }
    };
    
    
    
    $scope.saveShiftReport = saveShiftReport;
    
    function saveShiftReport(shiftReport){
      shiftService.saveShiftData(report).then(function(res){
        $window.alert("Shift Report Saved");
      })
      
    }
    
    function applyShiftReportData(){
      shiftService.getShiftData(shiftDate).then(function (res){
                        console.log(res);
                        $scope.report = res.data;
                    })
    }
      
    }
  }
  
})();