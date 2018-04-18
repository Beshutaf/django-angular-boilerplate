(function () {
    'use strict';

    angular
        .module('app.shiftReport')
        .service('constants', constants);

    constants.$inject = [];

    function constants() {
       
        return {
            getBillTypes: getBillTypes() 
        };
       
        function getBillTypes () {
            return [200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.1];    
            
        }
        
        function toastrOptions() {
            return {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }

        }
        function getColors() {
            return [
                '#FD5632', '#2858EB', '#BFB900', '#42DB1E', '#BE17FD', '#FFAF1A', '#04EBCA', '#FD0477', '#702B00', '#007007',
                '#DC143C', '#CD5C5C', '#6A5ACD', '#00FF00', '#9400D3', '#9ACD32', '#FF4500', '#00FF7F', '#66CDAA', '#00CED1',
                '#BA55D3', '#1E90FF', '#FF1493', '#F4A460', '#C0C0C0', '#FFD700', '#87CEFA', '#FF00FF', '#FFEFD5', '#000000',
                '#2F4F4F', '#000080', '#008000', '#00008B', '#8B0000', '#228B22', '#4B0082', '#8B4513', '#483D8B', '#2E8B57',
                '#A52A2A', '#808000', '#6B8E23', '#696969', '#B22222', '#A0522D', '#008B8B', '#8B008B', '#3CB371', '#708090',
                '#4682B4', '#D2691E', '#778899', '#C71585', '#5F9EA0', '#20B2AA', '#CD853F', '#0000FF', '#FF0000', '#4169E1',
                '#9932CC', '#8A2BE2', '#DAA520', '#BC8F8F', '#8FBC8F', '#7CFC00', '#FF6347', '#BDB76B', '#7FFF00', '#9370DB',
                '#DB7093', '#7B68EE', '#FF8C00', '#A9A9A9', '#00FA9A', '#FF7F50', '#6495ED', '#F08080', '#48D1CC', '#E9967A',
                '#FA8072', '#FFA500', '#D2B48C', '#ADFF2F', '#40E0D0', '#90EE90', '#DEB887', '#00BFFF', '#FFA07A', '#DA70D6',
                '#FF69B4', '#98FB98', '#87CEEB', '#191970', '#DDA0DD', '#7FFFD4', '#ADD8E6', '#D8BFD8', '#00FFFF', '#FFFF00',
                '#00FFFF', '#FF00FF', '#F0E68C', '#EE82EE', '#ABD1B5', '#B0E0E6', '#FFB6C1', '#EEE8AA', '#F5DEB3', '#FFC0CB',
                '#AFEEEE', '#FFDEAD', '#DCDCDC', '#FFDAB9', '#FFE4B5', '#FFE4C4', '#FFEBCD', '#FAEBD7', '#FFE4E1', '#E6E6FA',
                '#F5F5DC', '#FAFAD2', '#FFFACD', '#FAF0E6', '#FFF8DC', '#FDF5E6', '#F5F5F5', '#F0FFF0', '#E0FFFF', '#FFFFE0'

            ];
        }
    }
})();