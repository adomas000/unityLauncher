angular.module("App")

.controller("initCtrl",function($scope,$http){
    //check if app holds any info about unity paths
    $http({
        method:'GET',
        url:'config/unityPaths.json'
    })
    .then(function(success){

        window.location.hash = "#!/main";
        
    })
    .catch(function(reject){
        console.log("Error occured trying to retrieve file");

        window.location.hash = "#!/firstLaunch";
    })
})