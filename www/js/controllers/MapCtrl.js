angular.module('starter.map', [])
    .controller('MapCtrl', function ($scope, $state, $cordovaGeolocation, $ionicModal, $http) {
        
        var options = {
            timeout: 10000,
            enableHighAccuracy: true
        };

        //scope elements
        $scope.motionCount = 0;
        $scope.keepPoints = [];
        $scope.paths = [];
        $scope.bases = []; //Charging Bases, later used and displayed in the view for this controller
        $scope.points = []; //Location Points, later used and displayed in the view for this controller
        $scope.patnIds = []; //Generate new Path Id when adding new Flight Plan Path
        $scope.pathId = 0;
        $scope.pathIds = [];
        $scope.coordinates = [];
        $scope.y = 0;
        $scope.x = 0;
        $scope.y1 = 0;
        $scope.x1 = 0;
        $scope.pathIds.push($scope.pathId);
        $scope.pathEl = '<path id="theMotionPath" d="M322 528,'; //Define the flight plan path
        $scope.nearest = function () {
            $scope.show = "true";
        }
        $scope.start = function () {
            if ($scope.coordinates.length >= 2) {
                var removed = $scope.coordinates.splice($scope.coordinates.length - 4, 4);
                $scope.y = removed[0];
                $scope.x = removed[1];
                $scope.y1 = removed[2];
                $scope.x1 = removed[3];

                console.log($scope.y);
                console.log($scope.x);
                console.log($scope.y1);
                console.log($scope.x1);
            }

            var svg = document.getElementById('svgEl');
            $scope.pathEl += '" stroke-width="5px" stroke="blue" fill="none"/>\n' + '<circle cx="" cy="" r="8" fill="red">\n' +
                '<animateMotion dur="70s" repeatCount="indefinite">\n' +
                '<mpath xlink:href="#theMotionPath"/>\n' +
                '</animateMotion>\n' +
                '</circle>';
            $scope.showAnimation = "defined";

        }
        //Ionic modals that enable the user to input his coordinates
        $ionicModal.fromTemplateUrl('modal.html', {
            id: '1',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.Modal1 = modal;
        });

        $ionicModal.fromTemplateUrl('modalPoint.html', {
            id: '2',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.Modal2 = modal;
        });

        $scope.openModal = function (index) {
            if (index == 1) $scope.Modal1.show();
            else $scope.Modal2.show();
        };

        $scope.closeModal = function (index) {
            if (index == 1) $scope.Modal1.hide();
            else $scope.Modal2.hide();
        };
        $scope.createBase = createBase;
        $scope.createLocationPoint = createLocationPoint;
        
        //Creating charging base from user input GPS coordinates
        function createBase(newBase) {
            var style = newBase;
            $scope.bases.push(style);
            console.log($scope.bases);
        }
        $scope.prevxcorfirst = 0;
        $scope.prevycorfirst = 0;
    
        /*
         *Push the points and paths in the array and display them in the view
         *Algorhitm for keeping the previous and the current location points to create the path
         */
        function createLocationPoint(newLocation) {
            var style = newLocation;
            $scope.points.push(style);
            var inject = {};

            $scope.coordinates.push(newLocation.ycor);
            $scope.coordinates.push(newLocation.xcor);
            if ($scope.points.length == 1) {
                inject.xfirst = 320;
                inject.yfirst = 522;
                inject.xsecond = $scope.points[0].xcor;
                inject.ysecond = $scope.points[0].ycor;
                $scope.pathEl += ' ' + newLocation.ycor + ' ' + newLocation.xcor + ',';
            } else if ($scope.points.length > 1) {

                inject.xfirst = $scope.prevycorfirst;
                inject.yfirst = $scope.prevxcorfirst;
                inject.xsecond = newLocation.xcor;
                inject.ysecond = newLocation.ycor;
                $scope.pathEl += ' ' + newLocation.ycor + ' ' + newLocation.xcor + ',';
                console.log($scope.pathEl);
                $scope.pathId++;
                $scope.pathIds.push($scope.pathId);
            }
            $scope.paths.push(inject);

            $scope.prevxcorfirst = newLocation.xcor;
            $scope.prevycorfirst = newLocation.ycor;


        }
        //In case the user wants to stop his flight plan
        $scope.stop = function () {
            console.log('clicked');

            var svg = document.getElementById("svgEl");
            svg.removeChild(document.getElementById("delete"));
        }

        //Get the user's GPS location and display it in in google maps    
        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: latLng,
                zoom: 19,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


            google.maps.event.addListenerOnce($scope.map, 'idle', function () {

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });

                var infoWindow = new google.maps.InfoWindow({
                    content: "Here I am!"
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.open($scope.map, marker);
                });

            });



        }, function (error) {
            console.log("Could not get location");
        });


    });