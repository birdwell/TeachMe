'use strict';

angular.module('myApp.view1', ['ngRoute','firebase','ui.bootstrap.modal'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$firebase', function($scope, $firebase) {
    var fireBase = new Firebase('https://shining-fire-6589.firebaseio.com');
    $scope.collection = {};

    $scope.addCollection = function() {
        var title = $scope.collection.title;
        var type = $scope.collection.type;
        var desc = $scope.collection.description;
        fireBase.push({
            title: title,
            type: type,
            desc: desc
        });
    };

    $scope.open = function() {
      $scope.showModal = true;
    };

    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };
}])
