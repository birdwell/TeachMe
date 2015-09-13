'use strict';

angular.module('myApp.view3', ['ngRoute','firebase','ui.bootstrap.modal','ngTagsInput'])

    .config(['$routeProvider',,function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
	}])

    .controller('View3Ctrl', ['$scope','$firebaseArray','$http','$firebaseAuth','$firebaseObject', function($scope, $firebaseArray, $http, $firebaseAuth,$firebaseObject) {
	    var q_string = "asdf";
	    var ref = new Firebase('https://shining-fire-6589.firebaseio.com');

    console.log("view3 dot J-S has been viewed!.");

    $scope.message = "This does not do nothing either!";
    $scope.yay=function(){
	console.log("SO MUCH NOTHING IS NOT BEING DONE");
	$scope.yay2()
    };
    $scope.yay2=function(){
	console.log("SOsalfksjdf MUCH NOTHING IS NOT BEING DONE");
	$scope.yay3()
    };
    
    $scope.go=function(){
	$location.path( path );
    };

    $scope.onSubmit=function(){
	$scope.go('/View3')
	console.log("!!!!!!!");
	$scope.yay()
	//scoresRef.orderByValue().on("value", function(snapshot) {
	//snapshot.forEach(function(data) {
	//	console.log("The " + data.key() + " dinosaur's score is " + data.val());
	//    });
	//  });
	console.log("MORE !!!!!");
	// To iterate the key/value pairs of the object, use angular.forEach()
	//        angular.forEach($scope.obj, function(value, key) {
	//console.log(key, value);
	//});
    };
	    
	}])