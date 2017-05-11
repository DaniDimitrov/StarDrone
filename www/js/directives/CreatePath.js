
angular.module('starter.createPath',[])
    .directive('createPath', function () {
        return {
            restrict: 'A',
            template: '<path class="key-anim1" id="allPaths" fill="none" stroke-width="5px" stroke="rgba(200,10,10,0.5)" d="M{{pmp.xfirstA}} {{pmp.yfirstA}},{{pmp.ysecondA}} {{pmp.xsecondA}}" id="{{pmp.xmonA}}" />',
            scope: {
                xfirst: '@xfirst',
                yfirst: '@yfirst',
                xsecond: '@xsecond',
                ysecond: '@ysecond',
                xmon: '@xmon',
            },
            controller: function () {
                var pmp = this;
                activate();
                pmp.trustCon = function (conn) {
                    return $sce.trustAsResourceUrl('#' + conn);
                };

                function activate() {
                    pmp.xfirstA = pmp.xfirst;
                    pmp.yfirstA = pmp.yfirst;
                    pmp.xsecondA = pmp.xsecond;
                    pmp.ysecondA = pmp.ysecond;
                    pmp.xmonA = pmp.xmon;
                }
            },
            controllerAs: 'pmp',
            bindToController: true
        };
    })

                                  