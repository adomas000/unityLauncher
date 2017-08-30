angular.module("App",["ngRoute","luegg.directives","ngTable"])

.config(function($routeProvider){
    $routeProvider
    .when("/",{
        //controller:"initCtrl"
        //templateUrl:"src/html/test.html"
    })
    .when("/main",{
        controller:"mainCtrl",
        templateUrl:"src/html/main.html"
        
        //templateUrl:"src/html/test.html"
    })
    .when("/search",{
        templateUrl:"src/html/searchUnity.html"
    })
    .otherwise({
        redirectTo:'/'
    })
})