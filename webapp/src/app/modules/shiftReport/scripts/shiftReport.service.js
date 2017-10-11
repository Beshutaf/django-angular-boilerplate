(function () {
  'use strict';

  angular
    .module('app.shiftReport')
    .factory('shiftService', shiftService);
    
    shiftService.$inject=['$http']

  function shiftService($http) {
        
        return {
            getShiftData: getShiftData,
            saveShiftData: saveShiftData
        }
        function getShiftData(shiftDate){
          var urlDate = moment(shiftDate, 'DD-MM-YYYY').format("YYYY/MM/DD")
            $http.get('shifts/'+urlDate).then(function (res){
              console.log(res)
            }, function (errRes){
              console.error(errRes)
            });    
        }
        
        function saveShiftData(){
            
        }
        
    }
  
})();