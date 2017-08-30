var vsort = require('version-sort'); //need to delete this since this doesnt work at all
angular.module("App")

.controller("mainCtrl",function($scope,Globals,$http,NgTableParams){
    //init
    var grouped = {};
    (function(){
        Globals.update();
        $scope.data = Globals.unity;
       
            //tmp = el.version.replace(/(Unity)|(\(32-bit\)|\(64-bit\)$)|\s/g,"");
        console.log($scope.data);
        
        
        // $scope.data.forEach(function(element) {
        //     tmp = element.version.replace(/(Unity)|(\(32-bit\)|\(64-bit\)$)|\s/g,"");
        //     tmp = tmp.split(".");
        //     element.group = tmp[0]+"."+tmp[1];

        //     if(!$scope.group.includes(tmp[0]+"."+tmp[1])){
        //         $scope.group.push(tmp[0]+"."+tmp[1]);
        //     }
            
        // });

        $scope.data.forEach(function(element){
            tmp = element.version.replace(/(Unity)|(\(32-bit\)|\(64-bit\)$)|\s/g,"");
            tmp = tmp.split(".");
            group = tmp[0]+"."+tmp[1];
            (!grouped[group])? grouped[group] = [] : grouped[group].push(element);
        });

        console.warn("<here>");
        console.log(grouped);

        $scope.group = grouped;

        //console.log($scope.group);
        $scope.options = new NgTableParams({}, {dataset: $scope.data});

    })()


          
    function createUsingFullOptions() {
        var initialParams = {
            count: 5, // initial page size
        };
        var initialSettings = {
            
            // page size buttons (right set of buttons in demo)
            counts: [],
            // determines the pager buttons (left set of buttons in demo)
            paginationMaxBlocks: 13,
            paginationMinBlocks: 2,
            dataset: $scope.data,
        };
        return new NgTableParams(initialParams, initialSettings);
    }
    
    $scope.reverse = function(){
        console.log("s");
        $scope.options = new NgTableParams({}, {dataset: $scope.data.reverse()});
    }
    

});