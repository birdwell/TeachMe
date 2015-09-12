'use strict';

angular.module('myApp.view1', ['ngRoute','firebase','ui.bootstrap.modal','ngTagsInput'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$firebaseArray','$http','$firebaseAuth','$firebaseObject', function($scope, $firebaseArray, $http, $firebaseAuth,$firebaseObject) {
    var ref = new Firebase('https://shining-fire-6589.firebaseio.com');
    var auth = $firebaseAuth(ref);
    $scope.showModal = false;
    $scope.authData = null;
	
	$firebaseObject(ref.child("collections")).$bindTo($scope,"collections");
	$firebaseObject(ref.child("users")).$bindTo($scope,"users");
	
	
    auth.$onAuth(function(authData){
        console.log("currently",authData);
        $scope.authData = authData;
    });
	
    $scope.tags = [
		   { text: 'Tag1' },
		   { text: 'Tag2' },
		   { text: 'Tag3' }
		   ];
    /*$scope.collection.loadTags = function(query) {
	    return $http.get('tags.json');
	};*/

    $scope.addCollection = function() {
        var title = $scope.collection.title;
        var type = $scope.collection.type;
        var desc = $scope.collection.description;
        var tags = $scope.collection.tags;
        if ($scope.authData) {
          console.log("Authenticated user with uid:", $scope.authData.uid);
        }

		var c = ref.child('collections').push()
		c.setWithPriority({
			title: title,
			type: type,
			desc: desc || '',
			tags: tags || [],
			authorId: $scope.authData.uid
		}, 0 - Date.now(), onComplete); //http://stackoverflow.com/a/25613337/1181387
		
        ref.child('users').child($scope.authData.uid).child('collectionIDs').push().setWithPriority(c.key(),0 - Date.now());
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
      $scope.collection = {type:"References"};
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
