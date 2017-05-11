angular.module('starter.starter', [])
    .controller('StarterCtrl', function ($scope, $state, $cordovaGeolocation, $ionicModal, $http) {
        $http.post(" http://localhost:3030/droneState", {
            command: "droneState"
        }).then(function (data) {
            $scope.battery = data.battery;
            $scope.landed = data.landed;
            $scope.takingOff = data.takingOff;
        });
        $scope.takePhoto = function () {
            $http.post(" http://localhost:3030/takePhoto", {
                command: "takePhoto"
            });
        }
    });