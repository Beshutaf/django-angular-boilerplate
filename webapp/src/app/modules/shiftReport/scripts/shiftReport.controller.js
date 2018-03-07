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
    $scope.getPrevDay = getPrevDay;
    
    $scope.newMembersTitle = "מצטרפים חדשים";
    $scope.leftMembersTitle = "חברים שעזבו";
    $scope.newMembersLink="https://docs.google.com/forms/d/e/1FAIpQLScLwyRApEifTXIxasjY_fVe2DPuPiJdh5mqeMuO9DZ9O5nLQw/viewform?c=0&w=1";
    $scope.leftMembersLink="https://docs.google.com/forms/d/e/1FAIpQLSeT_Oz2gTdAzE5-BgTwL5EUAUYFAidj12AIjyHs7C_UOAMPeg/viewform?c=0&w=1&usp=send_form";
    
    
    $scope.todayDate = moment().format("DD-MM-YYYY");
    console.log($scope.todayDate);
    getShiftReport ($scope.todayDate);
  
    
    function updateShiftData(data){
      $scope.report = {
        shiftDate:data.date ? data.date : $scope.todayDate,
        members:data.member_shifts,
        new_members:data.new_members,
        leaving_members:data.leaving_members ? data.leaving_members : [],
        tasks:data.tasks ? data.tasks: [],
        conclusions:data.conclusions ? data.conclusions : [],
        disposed_products:data.disposed_products,
        cache:{
          money_from_shares:data.money_from_shares,
          money_from_cash:data.money_from_cash,
          money_from_cheques:data.money_from_cheques,
          envelope_number:data.envelope_number,
          money_at_shift_start: data.money_at_shift_start ? data.money_at_shift_start:
          [
            {
              unit:"1",
              amount:"0"
            },
            {
              unit:"2",
              amount:"0"
            },
            {
              unit:"5",
              amount:"0"
            },
            {
              unit:"10",
              amount:"0"
            },
            {
              unit:"20",
              amount:"0"
            },
            {
              unit:"50",
              amount:"0"
            },
            {
              unit:"100",
              amount:"0"
            },
            {
              unit:"200",
              amount:"0"
            }
          ],
          money_at_shift_end: money_at_shift_end ? money_at_shift_end: 
          [
           {
            unit:"1",
            amount:"0"
          },
          {
            unit:"2",
            amount:"0"
          },
          {
            unit:"5",
            amount:"0"
          },
          {
            unit:"10",
            amount:"0"
          },
          {
            unit:"20",
            amount:"0"
          },
          {
            unit:"50",
            amount:"0"
          },
          {
            unit:"100",
            amount:"0"
          },
          {
            unit:"200",
            amount:"0"
          } 
        ]
        }
      };
    }
    
    function saveShiftReport(shiftReport){
      shiftService.saveShiftData(shiftReport).then(function(res){
        $window.alert("Shift Report Saved");
      });
    }
    
    function getShiftReport(shiftDate){
      shiftService.getShiftData(shiftDate).then(function (res){
                        console.log(res);
                        updateShiftData(res.data);
                    }, function (err){
                      updateShiftData({});
                    })
    }
    
    function getNextDay() {
          $scope.shiftDate = moment($scope.todayDate, 'DD-MM-YYYY').add(1, 'day').format('DD-MM-YYYY');
          getShiftData($scope.shiftDate);
    }

    function getPrevDay() {
        $scope.shiftDate = moment($scope.shiftDate, 'DD-MM-YYYY').subtract(1, 'day').format('DD-MM-YYYY');
        getShiftData($scope.shiftDate);
    }
  }
  
  
})();