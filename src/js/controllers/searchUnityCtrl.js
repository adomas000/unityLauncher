var walk = require('walk')
    , fs = require('fs')
    , walker;
var promise = require("promise");
var pathutil= require("path");
var child = require("child_process");

angular.module("App")

.controller("searchUnityCtrl",function($scope,$window,$http){
    $scope.options;
    $scope.paths;

    (function(){

        $http({
        method:'GET',
        url:'setup.json'
        })
        .then(function(data){
            $scope.options = data.data;
            if($scope.options.debug)
            {
                //debugger;
                if($scope.options.filename && (typeof $scope.options.skipDirectories == "object") && (typeof $scope.options.filename == "string"))
                {
                    
                   toastr.success("setup.json is valid"); 
                }
                else
                {
                   toastr.error("setup.json is not valid"); 
                }
            }
            console.log($scope.options);
        })
        .catch(function(error){
            toastr.error("Could not get setup.json file!, some functions will not work!");
            toastr.error(error);
        });

    })()
    
    
    $scope.searchWithPaths = function()
    {
        //debugger;
        //$scope.all_output = "TEST";
        $scope.paths = $window.paths;
        var walker;
        var resPaths = [];
        var STOP = false;
        $scope.count1;
        $scope.count2;
        var skipDirectories = $scope.options.skipDirectories;
        
        //loop for the paths provided
        (function loop(i){
            
            if(i < $scope.paths.length) new promise(function(resolve, reject){

                debugger;
                var ls = child.spawn('./dist/search/search.exe',[$scope.paths[i]]);
                ls.stdout.on("data",function(data){
                    data = data.toString().split("\n");
                    //data.replace(/\n|\r/g, "");
                    //console.log(data);

                    data.forEach(function(el){
                        if(el!="")
                        {
                            el = el.replace(/\n|\r/g, "");
                            resPaths.push(el);
                            $scope.found_output += el + "\n";
                            $scope.count1++;
                            $scope.$evalAsync();
                            
                        }
                        
                    });
                    
                    
                })
                ls.stdout.on("end",function(data){
                    resolve("search finnished part(" + (i+1) + "/" + $scope.paths.length+")");
                })
                

            }).then(function(info){
                
                //resPaths = resPaths.concat(tmp);
                console.log(resPaths);
                fs.writeFileSync('./config/unityPaths.json',JSON.stringify(resPaths));
                toastr.success(info);
                if(!STOP) loop(i+1);

            }).catch(function(error){
                toastr.error(error);
                console.log(error);  
                if(!STOP) loop(i+1);
            });
           
        })(0)

        // setTimeout(function(){
        //     //console.log(search);
        //     STOP = true;
            
        // },5000);


    }

    // function walking(path,filter=[])
    // {
    //     return new promise(function(resolve,reject){
    //         walker = walk.walk(path, {filters: filter});
    //              //$scope.$evalAsync()
    //             walker.on("directories", function (root, dirs, next) {
    //             //if(STOP) return resolve(tmp);
    //             //debugger;
    //             // $scope.all_output += root +"\\"+ fileStats.name + "\n";
    //             // $scope.count2++;
    //             // $scope.$evalAsync()

    //             if(dirs.length==2)
    //             {
    //                 if(dirs[0].name == "Editor" && dirs[1].name== "MonoDevelop")
    //                 {
                        
    //                     console.log(root+"\\"+dirs[0].name);
    //                     //walker = walk.walk(path.dirname(root),{filters: $scope.options.skipDirectories});
                        
    //                     return resolve({
    //                         unityPath:root+"\\"+dirs[0].name,
    //                         skipPath:pathutil.basename(root)
    //                     })
    //                 }
    //             }
    //             next(); 
                    
    //             // fs.readFile(fileStats.name, function () {
    //             //     $scope.all_output += root +"\\"+ fileStats.name + "\n";
    //             //     $scope.count2++;
    //             //     $scope.$evalAsync()
                    
    //             //     if(fileStats.name.match(/(.html)$/))
    //             //     {
    //             //         //console.log("found: "+ root +"\\"+ fileStats.name);
    //             //         $scope.found_output += root +"\\"+ fileStats.name + "\n";
    //             //         $scope.count1++;
    //             //         $scope.$evalAsync()                        
    //             //         tmp.push(root +"\\"+ fileStats.name);
    //             //         //console.log(fileStats);
    //             //     }
    //             // next();
    //             // });
    //         });

    //         walker.on("end", function () {
    //             resolve();                 
                
    //         });

    //         walker.on("error", function (e) {
    //             reject(e);
                
    //         });
    //     });
   
    // }

});