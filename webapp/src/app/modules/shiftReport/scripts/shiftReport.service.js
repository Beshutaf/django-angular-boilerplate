(function () {
    'use strict';

    angular
        .module('app.shiftReport')
        .factory('shiftService', shiftService);

    shiftService.$inject=['$http'];

    function shiftService($http) {
        return {

            getShiftData: getShiftData,
            saveShiftData: saveShiftData
            
        };

        function getShiftData(shiftDate){
            var urlDate = moment(shiftDate, 'DD-MM-YYYY').format("YYYY/MM/DD");
            var params= {format:"json"}
            return $http.get('shifts/'+urlDate,{params: params});
        }
        
        function saveShiftData(shiftReport){
            var urlDate = moment(shiftReport.shiftDate, 'DD-MM-YYYY').format("YYYY/MM/DD");
            return $http.post('shifts/'+urlDate,JSON.stringify(shiftReport));
        }
    }

})();