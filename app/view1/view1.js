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
	
    $scope.loadTags = function(query) {
	    return $http.get('tags.json');
	};
	
	$scope.processKeypress = function($event){
		if($event.which==13)$scope.addCollection();
	}

    $scope.addCollection = function() {
        var title = $scope.newcollection.title;
        var type = $scope.newcollection.type;
        var desc = $scope.newcollection.description;
        var tags = $scope.newcollection.tags;
        if ($scope.authData) {
          console.log("Authenticated user with uid:", $scope.authData.uid);
        }

		var ind = Math.floor(Math.random()*1000000)+Math.floor(Math.random()*1000000)+Math.floor(Math.random()*1000000);
		$scope.collections[ind] = {
			title: title,
			type: type,
			desc: desc || '',
			tags: tags || [],
			authorId: $scope.authData.uid,
			date: Date.now()
		};
		
		$scope.users[$scope.authData.uid].collectionIDs.push(ind);
    };
	
	$scope.upvote = function(collection){
		if(!$scope.authData)alert("Log in to do that");
		
		if(!collection.upvotes)collection.upvotes=[];
		
		if(collection.upvotes[$scope.authData.uid])
			collection.upvotes[$scope.authData.uid] = 0;
		else
			collection.upvotes[$scope.authData.uid] = 1;
	};
	$scope.countupvotes = function(collection){
		if(!collection.upvotes)collection.upvotes=[];
		
		return Object.keys(collection.upvotes).reduce(function (previous, key) {
			return previous + collection.upvotes[key];
		}, 0); //this is brilliant http://stackoverflow.com/a/15748853/1181387
	};
	$scope.upvoted = function(collection){
		return $scope.authData && collection.upvotes && collection.upvotes[$scope.authData.uid];
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
