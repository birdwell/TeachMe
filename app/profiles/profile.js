'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/profiles/:profileId', {
        templateUrl: 'profiles/profile.html',
        controller: 'ProfileCtrl'
    });
}])

.controller('ProfileCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.title = '';

        //Get ID out of current URL
        var ref = new Firebase('https://shining-fire-6589.firebaseio.com/profiles/' + $routeParams.profileId);
        ref.on("value", function(snapshot) {
            var profile = snapshot.val();
            $scope.title = profile.title;
            $scope.type = profile.type;
            $scope.desc = profile.desc || '';
            $scope.tags = profile.tags || [];
            $scope.$apply();
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }
]);
