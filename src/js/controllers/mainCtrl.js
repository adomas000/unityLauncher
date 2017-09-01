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

        // $scope.data.forEach(function(element){
        //     tmp = element.version.replace(/(Unity)|(\(32-bit\)|\(64-bit\)$)|\s/g,"");
        //     tmp = tmp.split(".");
        //     group = tmp[0]+"."+tmp[1];
        //     if(!grouped[group]){
        //       grouped[group] = [];
        //       grouped[group].push(element);
        //     } else{
        //       grouped[group].push(element);
        //     }
        // });

        $scope.data.forEach(function(element){
            tmp = element.version.replace(/(Unity)|(\(32-bit\)|\(64-bit\)$)|\s/g,"");
            tmp = tmp.split(".");
            element.baseVersion = tmp[0]+"."+tmp[1];
        });

        console.warn("<here>");
        console.log($scope.data);


        //console.log(grouped);

        //$scope.group = grouped;

        //console.log($scope.group);
        $scope.options = createUsingFullOptions();

    })()



    function createUsingFullOptions() {
        var initialParams = {
          //  count: 5, // initial page size
            group:"baseVersion",
            
        };
        var initialSettings = {

            // page size buttons (right set of buttons in demo)
            //counts: [],
            // determines the pager buttons (left set of buttons in demo)
            //paginationMaxBlocks: 13,
            //paginationMinBlocks: 2,
            groupOptions: {
              isExpanded: false
            },
            dataset: $scope.data,
        };
        return new NgTableParams(initialParams, initialSettings);
    }

    $scope.reverse = function(){
        console.log("s");
        $scope.options = new NgTableParams({}, {dataset: $scope.data.reverse()});
    }

    $scope.toggle = function () {
        $scope.options.settings().groupOptions.isExpanded = ($scope.options.settings().groupOptions.isExpanded) ? false : true;
        $scope.options.reload();
    }


});
