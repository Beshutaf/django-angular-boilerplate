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
    $scope.getNextDay = getNextDay;
    
    $scope.newMembersTitle = "מצטרפים חדשים";
    $scope.leftMembersTitle = "חברים שעזבו";
    $scope.newMembersLink="https://docs.google.com/forms/d/e/1FAIpQLScLwyRApEifTXIxasjY_fVe2DPuPiJdh5mqeMuO9DZ9O5nLQw/viewform?c=0&w=1";
    $scope.leftMembersLink="https://docs.google.com/forms/d/e/1FAIpQLSeT_Oz2gTdAzE5-BgTwL5EUAUYFAidj12AIjyHs7C_UOAMPeg/viewform?c=0&w=1&usp=send_form";
    
    
    $scope.todayDate = moment().format("DD-MM-YYYY");
    console.log($scope.todayDate);
    getShiftReport ($scope.todayDate);
  
   
    function updateShiftData(data){
      console.log(data.date);
      var tmpDate = moment(data.date).format("DD-MM-YYYY");
      debugger;
      $scope.shiftDate = data.date ?  data.date : $scope.todayDate;
      $scope.report = {
        shiftDate: $scope.shiftDate,
        members:data.member_shifts,
        new_members:data.new_members,
        leaving_members:data.leaving_members ? data.leaving_members : [],
        tasks:data.tasks ? data.tasks: [],
        conclusions:data.conclusions ? data.conclusions : [],
        disposed_products:data.disposed_products ? data.disposed_products : [],
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
          money_at_shift_end: data.money_at_shift_end ? data.money_at_shift_end: 
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
      
      //call digest
      if(!$scope.$$phase) {
        $scope.$apply();
      }
      
    }
    
    function saveShiftReport(shiftReport){
      shiftService.saveShiftData(shiftReport).then(function(res){
        $window.alert("Shift Report Saved");
      });
    }
    
    function getShiftReport(shiftDate){
      shiftService.getShiftData(shiftDate).then(function (res){
                        console.log(res);
                        res = {
                       date: "17-03-18",
                       member_shifts: [
                          {
                              member: "גלי פז",
                              role: "leader",
                              shift_number: "1"
                          },
                          {
                              member: "גלי פז",
                              role: "worker",
                              shift_number: "2"
                          },
                       ],
                       new_members: [
                          "sdfsdf sdfds"

                       ],
                       leaving_members: [
                          "sdgg weree"
                       ],
                       conclusions: [
                          {
                              comment: "sdfdgdsg",
                              assigned_team:                "מחלקת ספקים",

                              done: true
                          },
                          {
                              comment: "lk;lk ;lko",
                              assigned_team:                 "מחלקת ספקים",

                              done: true
                          }
                       ],
                       tasks: [
                          {
                              comment: "sdfdgdsg",
                              done: true
                          },
                          {
                              comment: "lk;lk ;lko",
                              done: true
                          }
                       ],
                       money_at_shift_start: [
                          {
                              unit: "200",
                              amount: "3"
                          },
                          {
                              unit: "5",
                              amount: "20"
                          }
                          ],
                       money_at_shift_end: [
                          {
                              unit: "100",
                              amount: "2"
                          },
                          {
                              unit: "10",
                              amount: "8"
                          }
                       
                       ],
                       money_from_shares: "600",
                       money_from_cheques: "1200",
                       money_from_cash: "1000",
                       envelope_number: "1234",
                       almost_missing_products: [
                          "tomatos", "salt"
                       ],
                       disposed_products: [
                          "ginger"
                       ],
                      };
                      
                        updateShiftData(res);
                    }, function (err){
                      updateShiftData({});
                    })
    }
    
    function getNextDay() {
          var shiftDate = moment($scope.shiftDate, 'DD-MM-YYYY').add(1, 'day').format('DD-MM-YYYY');
          console.log(shiftDate);
          $scope.shiftDate = angular.copy(shiftDate);
          
          shiftService.getShiftData(shiftDate);
          
    }

    function getPrevDay() {
        var shiftDate  = moment($scope.shiftDate, 'DD-MM-YYYY').subtract(1, 'day').format('DD-MM-YYYY');
        $scope.shiftDate = angular.copy(shiftDate);
        shiftService.getShiftData(shiftDate);
        
    }
  }
  
  
})();