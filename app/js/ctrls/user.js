var app = angular.module("TeachmeApp",["firebase",'ui.bootstrap.modal']);
app.controller("TeachmeCtrl",function($scope,$firebaseAuth){
    var ref = new Firebase("https://shining-fire-6589.firebaseio.com/");
    var auth = $firebaseAuth(ref);

    $scope.authData = null;
    auth.$onAuth(function(authData){
        console.log("currently",authData);
        $scope.authData = authData;
    });

    $scope.login = function(){
        if($scope.authData === null){
            auth.$authWithPassword($scope.user, function(error, authData){
                if(error)
                    console.log("loginError:",error);
                else{
                    $scope.user = {};
                    $scope.confpass = "";
                }
            });
        }
    };
    $scope.processKeypress = function(e){
        if(e.which==13)
            $scope.login();
    };
    $scope.logout = function(){
        auth.$unauth();
    };
    $scope.register = function(){
        if($scope.authData === null){
            if($scope.user.password == $scope.confpass)
                auth.$createUser($scope.user).then(function(authData){
                    $scope.login();
                },function(authError){
                    console.log("regError:",authError);
                });
            else
                console.log("Error: passwords do not match");
        }
    };
    $scope.showModal=true;

});
