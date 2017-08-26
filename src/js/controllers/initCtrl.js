angular.module("App")

.controller("initCtrl",function($scope,$http,Globals){
    //check if app holds any info about unity paths
    $http({
        method:'GET',
        url:'config/unityPaths.json'
    })
    .then(function(success){
        debugger;
        Globals.unity = success.data.unity;
        Globals.searchPaths = success.data.searchPaths;
        //window.location.hash = "#!/main";
        window.location.hash = "#!/firstLaunch";
        console.log("eyyy,unity paths exist so showing main.html");
        
    })
    .catch(function(reject){
        console.log("Error occured trying to retrieve file");
        window.location.hash = "#!/firstLaunch";
    })
})