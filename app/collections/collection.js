'use strict';

angular.module('myApp.collection', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/collections/:collectionId', {
        templateUrl: 'collections/collection.html',
        controller: 'CollectionCtrl'
    });
}])

.controller('CollectionCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.title = '';

        //Get ID out of current URL
        var ref = new Firebase('https://shining-fire-6589.firebaseio.com/collections/' + $routeParams.collectionId);
        ref.on("value", function(snapshot) {
            var collection = snapshot.val();
            $scope.title = collection.title;
            $scope.type = collection.type;
            $scope.desc = collection.desc || '';
            $scope.tags = collection.tags || [];
            $scope.$apply();
        }, function(errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }
]);
