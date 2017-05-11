
angular.module('starter.flightPlan',[])
    .directive('flightPlan', function () {
        return {
            restrict: 'A',
            template: '<img src="img/tower-pic-sm.png" style="position:absolute; top:{{vm.topA}};bottom:{{vm.bottomA}};left:{{vm.leftA}};right:{{vm.rightA}}"; />',
            scope: {
                top: '@top',
                bottom: '@bottom',
                left: '@left',
                right: '@right',
            },
            controller: function () {
                var vm = this;

                activate();

                function activate() {
                    vm.topA = vm.top + 'px';
                    vm.bottomA = vm.bottom + 'px';
                    vm.leftA = vm.left + 'px';
                    vm.rightA = vm.right + 'px';

                }
            },
            controllerAs: 'vm',
            bindToController: true
        };
    });

                                  