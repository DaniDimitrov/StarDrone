console.log('Going in this controller');
angular.module('starter.home', [])
    .controller('HomeCtrl', function ($scope, $rootScope, $http) {
        //getTheUserLocationAndDoFaceRecognition
        $http.post(" http://localhost:3030/userLocation", {
            command: "userLocation"
        }).then(function (data) {
            console.log(data);
        });
        $http.post(" http://localhost:3030/faceRecognition", {
            command: "faceRecognition"
        }).then(function (data) {
            console.log(data);
        });

    });