var vsort = require('version-sort');
angular.module("App")

.controller("mainCtrl",function($scope,Globals,$http,NgTableParams){
    //init
    var sorted = [];
    (function(){
        Globals.update();
        $scope.data = Globals.unity;

        var tmpArr = [];
        $scope.data.forEach(function(el){
            el.version = el.version.replace(/(Unity)|(\(32-bit\)|\(64-bit\)$)|\s/g,"");
            tmpArr.push(el.version);
        });
        console.log(tmpArr);

        console.log(vsort(tmpArr));
        $scope.options = new NgTableParams({}, {dataset: $scope.data});

    })()

    console.log('main controller');
        
   

   
          
    function createUsingFullOptions() {
        var initialParams = {
            count: 5 // initial page size
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