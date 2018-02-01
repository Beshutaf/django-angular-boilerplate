(function () {
  'use strict';

  angular
    .module('app.shiftReport')
    .controller('ShiftReportCtrl', ShiftReportCtrl);
    
    ShiftReportCtrl.$inject=['$scope', 'constants', '$http', 'shiftService', '$window'];

  function ShiftReportCtrl($scope, constants, $http, shiftService, $window) {
    
    moment.locale('he');
    
    $scope.saveShiftReport = saveShiftReport;
    $scope.getShiftReport = getShiftReport;
    
    $scope.newMembersTitle = "מצטרפים חדשים";
    $scope.leftMembersTitle = "חברים שעזבו";
    $scope.newMembersLink="https://docs.google.com/forms/d/e/1FAIpQLScLwyRApEifTXIxasjY_fVe2DPuPiJdh5mqeMuO9DZ9O5nLQw/viewform?c=0&w=1";
    $scope.leftMembersLink="https://docs.google.com/forms/d/e/1FAIpQLSeT_Oz2gTdAzE5-BgTwL5EUAUYFAidj12AIjyHs7C_UOAMPeg/viewform?c=0&w=1&usp=send_form";
    
    $scope.searchNames = searchNames;
    
    $scope.report = {
      date:moment().format("DD-MM-YYYY"),
      members:[],
      new_members:[],
      leaving_members:[],
      tasks:[],
      conclusions:[],
      missing_products:[],
      cache:{
        money_from_shares:0,
        money_from_cash:0,
        money_from_cheques:0,
        envelope_number:0,
        money_at_shift_start:{
            "1":0,
            "2":0,
            "5":0,
            "10":0,
            "20":0,
            "50":0,
            "100":0,
            "200":0
          },
          money_at_shift_end:{
            "1":0,
            "2":0,
            "5":0,
            "10":0,
            "20":0,
            "50":0,
            "100":0,
            "200":0
          }
        }
    };
    
    
    
    
    
    function saveShiftReport(shiftReport){
      shiftService.saveShiftData(shiftReport).then(function(res){
        $window.alert("Shift Report Saved");
      })
      
    }
    
    function getShiftReport(shiftDate){
      shiftService.getShiftData(shiftDate).then(function (res){
                        console.log(res);
                        $scope.report = res.data;
                    })
    }
    
    $scope.data = {selectedNames:[]}
    
    function searchNames(term){
                var params = {
                    term:term,
                    format:"json"
                };
                return $http.get("/members", {params: params})
                .then(function(response) {
                    $scope.data.names = response.data;
                })
            }
      
    }
  
  
})();