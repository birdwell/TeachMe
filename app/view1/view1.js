'use strict';

angular.module('myApp.view1', ['ngRoute','firebase','ui.bootstrap.modal','ngTagsInput'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$firebase', function($scope, $firebase) {
    var fireBase = new Firebase('https://shining-fire-6589.firebaseio.com');
    $scope.collection = {};
    $scope.tags = [
		   { text: 'Tag1' },
		   { text: 'Tag2' },
		   { text: 'Tag3' }
		   ];
    $scope.collection.loadTags = function(query) {
		    return $http.get('tags.json');
		};
    $scope.addCollection = function() {
        var title = $scope.collection.title;
        var type = $scope.collection.type;
        var desc = $scope.collection.description;
	var tags = $scope.collection.tags;

        fireBase.push({
            title: title,
            type: type,
		    desc: desc,
		    tags:tags
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
