angular.module("App",["ngRoute"])

.config(function($routeProvider){
    $routeProvider
    .when("/",{
        //controller:"initCtrl"
        //templateUrl:"src/html/test.html"
    })
    .when("/firstLaunch",{
        templateUrl:"src/html/searchUnity.html"
    })
    .otherwise({
        redirectTo:'/'
    })
})