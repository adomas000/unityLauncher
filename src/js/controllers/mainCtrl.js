angular.module("App")

.controller("mainCtrl",function($scope,Globals){
    //init
    $scope.unityAll;
    (function(){

        Globals.update();
        $scope.unityAll = Globals.unity;

    })()

})