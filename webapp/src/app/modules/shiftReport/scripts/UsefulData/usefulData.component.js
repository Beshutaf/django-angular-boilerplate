(function() {
    'use strict';

    angular
        .module('app.shiftReport')
        .component('usefulData', {
            bindings: {},
            controller: usefulDataCtrl,
            templateUrl: '/app/modules/shiftReport/scripts/UsefulData/usefulData.template.html'
        });

    function usefulDataCtrl() {
        var ctrl = this;

        ctrl.phonesTitle = "טלפונים חשובים";

        ctrl.usefulPhones = [{
                name: "עמרי בן עמי",
                phone: "054-9747302",
                role: "מנהל חנות"
            },
            {
                name: "עדי פינקלשטיין",
                phone: "052-4238269",
                role: "תומכת pose"
            },
            {
                name: "סתיו הלל",
                phone: "050-6302791",
                role: "ראש צוות חנות"
            },
            {
                name: "מאור מלצר",
                phone: "054-4288270",
                role: "גזבר"
            }
        ];

        ctrl.poseDataTitle = "פרטי גישה לתוכנה הקופה Pose";
        ctrl.poseData = [{
                title: "קישור לתוכנת הקופה",
                data: "jerucoop.gotpose.com"
            },
            {
                title: "שם משתמש",
                data: "beshutaf1/2/3"
            },
            {
                title: "סיסמה",
                data: "Imcoop1/2/3"
            }
        ]
    }

})();
