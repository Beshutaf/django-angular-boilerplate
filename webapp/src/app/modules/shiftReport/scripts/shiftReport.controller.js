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
    $scope.leavingMembersTitle = "חברים שעזבו";
    $scope.confirmationMessage = "האם את בטוחה שאת רוצה לסגור את העמוד?";
    $scope.newMembersLink="https://docs.google.com/forms/d/e/1FAIpQLScLwyRApEifTXIxasjY_fVe2DPuPiJdh5mqeMuO9DZ9O5nLQw/viewform?c=0&w=1";
    $scope.leavingMembersLink="https://docs.google.com/forms/d/e/1FAIpQLSeT_Oz2gTdAzE5-BgTwL5EUAUYFAidj12AIjyHs7C_UOAMPeg/viewform?c=0&w=1&usp=send_form";
    
    
    $scope.todayDate = moment().format("DD-MM-YYYY");
    
    getShiftReport ($scope.todayDate);
  
  // fuction clearShiftReportData(){
  //     $scope.report
  // }
    
    function updateShiftData(data){
      $scope.shiftDate = data.date ?   moment(data.date, 'YYYY-MM-DD').format('DD-MM-YYYY') : $scope.todayDate; //tood: update the format of data.date after Daniel's fix
      $scope.report = {
        shiftDate: $scope.shiftDate,
        members:data.member_shifts? data.member_shifts :[],
        new_members:data.new_members? data.new_members: [],
        leaving_members:data.leaving_members ? data.leaving_members : [],
        tasks:data.tasks ? data.tasks: [],
        conclusions:data.conclusions ? data.conclusions : [],
        missing_products:data.missing_products ? data.missing_products : [],
        cache:{
          money_from_shares:data.money_from_shares,
          money_from_cash:data.money_from_cash ? Number(data.money_from_cash): 0,
          money_from_cheques:data.money_from_cheques,
          envelope_number:data.envelope_number,
          money_at_shift_start: data.money_at_shift_start ? data.money_at_shift_start:{},
          money_at_shift_end: data.money_at_shift_end ? data.money_at_shift_end: {}
        }
      };
      
      //call digest
      if(!$scope.$$phase) {
        $scope.$apply();
      }
      
      console.log($scope.report.members)
      
    }
    
    function saveShiftReport(shiftReport){
        shiftService.saveShiftData(shiftReport).then(function(res){
        $window.alert("Shift Report Saved");
      }, function (errRes){console.error(errRes)});
    }
    
    function getShiftReport(shiftDate){
      shiftService.getShiftData(shiftDate).then(function (res){
                        console.log(res);
                        updateShiftData(res.data);
                    }, function (err){
                      console.error(err)
                    })
    }
    
    function getNextDay() {
          var shiftDate = moment($scope.report.shiftDate, 'DD-MM-YYYY').add(1, 'day').format('DD-MM-YYYY');
          
          $scope.shiftDate = angular.copy(shiftDate);
          getShiftReport(shiftDate);
          
          // shiftService.getShiftData(shiftDate).then(function(res){
          //   updateShiftData(res);
          // },function(err){
          //   updateShiftData({});
          // });
          
    }

    function getPrevDay() {
        var shiftDate  = moment($scope.report.shiftDate, 'DD-MM-YYYY').subtract(1, 'day').format('DD-MM-YYYY');
        // $scope.shiftDate = angular.copy(shiftDate);
        // getShiftReport(shiftDate);
        shiftService.getShiftData(shiftDate).then(function(res){
       
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
                      money_at_shift_start: {
                        "5":20,
                        "200":3
                      },
                      money_at_shift_end: {
                        "10":8,
                        "100":2
                      },
                      money_from_shares: 600,
                      money_from_cheques: 1200,
                      money_from_cash: 1000,
                      envelope_number: "1234",
                      missing_products: [
                          "ginger", "tomatos", "salt"
                      ],
                      };
                      updateShiftData(res);
          
        }, function (err){
          // updateShiftData({});
        });
    }
    
    /////
    
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = $scope.confirmationMessage;

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return $scope.confirmationMessage;                            //Webkit, Safari, Chrome
    });
    
    window.addEventListener("unload", function (e) {
      saveShiftReport($scope.report);
    });
    

  }
  
  
})();