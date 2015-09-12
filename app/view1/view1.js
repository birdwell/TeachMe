'use strict';

angular.module('myApp.view1', ['ngRoute','firebase','ui.bootstrap.modal','ngTagsInput'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$firebase','$http','$firebaseAuth', function($scope, $firebase,$http, $firebaseAuth) {
    var ref = new Firebase('https://shining-fire-6589.firebaseio.com');
    var auth = $firebaseAuth(ref);
    $scope.showModal = false;
    $scope.authData = null;
    auth.$onAuth(function(authData){
        console.log("currently",authData);
        $scope.authData = authData;
    });

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
        if ($scope.authData) {
          console.log("Authenticated user with uid:", $scope.authData.uid);
        }

        ref.child('users').child($scope.authData.uid).child('collections').set({
            title: title,
            type: type,
		    desc: desc || '',
		    tags: tags || [],
            authorId: $scope.authData.uid
        }, onComplete);


    };
    var onComplete = function(error) {
      if (error) {
        console.log('Synchronization failed');
      } else {
        console.log('Synchronization succeeded');
        $scope.showModal = false;
      }
    };
    $scope.open = function() {
      $scope.showModal = true;
      $scope.collection = {};
      $scope.collection.type = 'References';
    };

    $scope.ok = function() {
      $scope.showModal = false;

    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };

    $scope.submit = function() {
      $scope.showModal = false;
    }
}])
