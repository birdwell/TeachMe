'use strict';

angular.module('myApp.view1', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$firebase', function($scope, $firebase) {
    var fireBase = new Firebase('https://shining-fire-6589.firebaseio.com');
    $scope.user = {};

    // calling our submit function.
    $scope.submitForm = function() {
        var username = $scope.user.username;
        var name = $scope.user.name;
        var email = $scope.user.email;
        fireBase.push({
            username: username,
            name: name,
            email: email
        });
    };
}]);
