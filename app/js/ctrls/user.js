var app = angular.module("TeachmeApp",["firebase",'ui.bootstrap.modal']);
app.controller("TeachmeCtrl",function($scope,$firebaseAuth){
    var ref = new Firebase("https://shining-fire-6589.firebaseio.com/");
    
	var auth = $firebaseAuth(ref);
    $scope.authData = null;
    auth.$onAuth(function(authData){
        console.log("currently",authData);
        $scope.authData = authData;
    });
	
	$scope.$watch("mode",function(){
		if(!$scope.mode){
			$scope.user = {};
			$scope.errmsg = null;
		}
	},true);
	
    $scope.login = function(){
        if($scope.authData === null){
            auth.$authWithPassword($scope.user).then(function(success){
				console.log(success);
				$scope.user = {};
				$scope.confpass = "";
				$scope.errmsg = "";
				$scope.mode = null;
            },function(error){
				$scope.errmsg = error;
			});
        }
    };
    $scope.processKeypress = function(e){
        if(e.which==13)
			if($scope.mode="registering")
				$scope.register();
			else
				$scope.login();
    };
    $scope.logout = function(){
        auth.$unauth();
    };
    $scope.register = function(){
        if($scope.authData === null){
            if($scope.user.password == $scope.confpass)
                auth.$createUser($scope.user).then(function(authData){
					ref.child("users").child(authData.uid).set({
						email: $scope.user.email
					})
                    $scope.login();
                },function(authError){
                    $scope.errmsg = authError;
                });
            else
                console.log("Error: passwords do not match");
        }
    };
    $scope.showModal=true;

});
