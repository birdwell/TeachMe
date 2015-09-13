'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/users/:uid', {
        templateUrl: 'profiles/profile.html',
        controller: 'ProfileCtrl'
    });
}])

.controller('ProfileCtrl', ['$scope', '$routeParams', '$firebaseObject',
    function($scope, $routeParams,  $firebaseObject) {
        $scope.title = '';
        var ref = new Firebase('https://shining-fire-6589.firebaseio.com/users/' + $routeParams.uid);
        $firebaseObject(ref).$bindTo($scope,"profile");
    }
]);
