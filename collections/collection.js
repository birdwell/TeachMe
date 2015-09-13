'use strict';

angular.module('myApp.collection', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/collections/:collectionId', {
        templateUrl: 'collections/collection.html',
        controller: 'CollectionCtrl'
    });
}])

.controller('CollectionCtrl', ['$scope', '$routeParams', '$firebaseObject',
    function($scope, $routeParams, $firebaseObject) {
        //Get ID out of current URL
        var ref = new Firebase('https://shining-fire-6589.firebaseio.com/collections/' + $routeParams.collectionId);
		$firebaseObject(ref).$bindTo($scope,"collection");
		$scope.newresource = function(){
			if($scope.collection.resources==null)
				$scope.collection.resources=[];
			$scope.collection.resources.push({});
		}
    }
]);
