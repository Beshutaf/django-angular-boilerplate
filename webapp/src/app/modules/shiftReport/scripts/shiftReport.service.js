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
            return $http.get('shifts/'+urlDate,{params: params}).then(function (res){
                return res.data
            }, function (errRes){
                console.error(errRes)
            });
        }
        
        function saveShiftData(shiftReport){
            var urlDate = moment(shiftReport.shiftDate).format("YYYY/MM/DD");
            return $http.post('shifts/'+urlDate,JSON.stringify(shiftReport));
        }
    }

})();