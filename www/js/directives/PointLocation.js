
angular.module('starter.pointLocation',[])
    .directive('pointLocation', function () {
        return {
            restrict: 'A',
            template: '<circle r="10" cy="{{vmp.xcorA}}" cx="{{vmp.ycorA}}" fill="#f33" />',
            scope: {
                xcor: '@xcor',
                ycor: '@ycor',
            },
            controller: function () {
                var vmp = this;
                activate();

                function activate() {
                    vmp.xcorA = vmp.xcor;
                    vmp.ycorA = vmp.ycor;
                }
            },
            controllerAs: 'vmp',
            bindToController: true

        };
    })

                                  