var walk = require('walk')
    , fs = require('fs')
    , walker;
var promise = require("promise");
var pathutil= require("path");
var child = require("child_process");

angular.module("App")
/**
 * main controller for the search view
 */
.controller("searchUnityCtrl",function($scope,$window,$http,Globals){
    $scope.options;
    $scope.paths;

    $scope.dataToShow = [];
    if(Globals.searchPaths)
    {
        $scope.dataToShow = Globals.searchPaths;
        $scope.$evalAsync();
    }

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
    
    /**
     * once paths have been added, and search button  is clicked, search will start
     */
    $scope.searchWithPaths = function()
    {
        //debugger;
        //$scope.all_output = "TEST";
        $scope.paths = $window.paths;
        var walker;
        var res = {};
        var resPaths = [];
        var STOP = false;
        $scope.found_output = "";
        $scope.count1;
        $scope.count2;
        var skipDirectories = $scope.options.skipDirectories;
        
        //loop for the paths provided
        (function loop(i){
            
            if(i < $scope.paths.length) new promise(function(resolve, reject){

                
                var ls = child.spawn('./dist/search/search.exe',[$scope.paths[i]]);
                ls.stdout.on("data",function(data){
                    debugger;
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
                
            /**
             *  after collecting all the required data async result will be returned here
             */
            }).then(function(info){
                
                //resPaths = resPaths.concat(tmp);
                console.log(resPaths);
                res.unity = resPaths;
                res.searchPaths = $scope.paths;
                /**
                 * get versions is function that uses powershell to get all the needed iformation about the Uninstall.exe (unity)
                 */
                getVersions(res)
                    .then(function(result){
                    /**
                     * putDataIntoJSON function is responsible for formating all the data nicely and writing it to file, as this is the final step for now
                     */
                       var rez = putDataIntoJSON(res.searchPaths,result);
                       if(rez){

                       }else{
                           console.log("error when trying to put data into JSON");
                           toastr.error("error when trying to put data into JSON");
                       }
                    })
                    .catch(function(err){
                        toastr.error(err);
                        console.error(err);
                    })
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
    /**
     * get versions is function that uses powershell to get all the needed iformation about the Uninstall.exe (unity)
     */
    function getVersions(res)
    {   //powershell -command "& {&Get-ItemPropertyValue 'D:\unityVersions\unity1 - Copy (4)\Editor\Uninstall.exe' -name 'VersionInfo' | ConvertTo-Json}"
        return new promise(function(resolve,reject){

            var asyncOperations = res.unity.length;
            var result = [];

            res.unity.forEach(function(element){
                if(fs.existsSync(element+"Uninstall.exe")){
                    
                    var command = 'powershell -command "& {&Get-ItemPropertyValue -Path \''+ element + "Uninstall.exe" +'\' -name \'VersionInfo\' | ConvertTo-Json}"';
                    //console.log(command);
                    child.exec(command,function(error, ls,stderr){

                        if(error)  {console.error(error);reject(error);} //this is the error on our side
                        //this is the error that will be outputed if command is invalid or sm sht
                        if(stderr) {
                            console.error(stderr);
                            console.warn("Command that was executed when error happened:\n" + command); 
                            reject(stderr);
                        }

                        ls = ls.toString();
                        ls = ls.replace(/\n|\r/g, "");
                        if(ls=="") {
                            toastr.warn("info about unity was returned empty (unity will not be visible as installed)\n "+ element);
                            asyncOperations--;
                            if(asyncOperations <= 0){
                                resolve(result);
                            }else{
                                return
                            }
                            
                        };
                        ls = JSON.parse(ls);
                        

                        result.push({
                            parentPath:element,
                            path:ls.FileName,
                            version: ls.ProductName,
                            modules:[
                                /*{
                                    name:"Android"
                                    path:"...Editor"
                                    version:"N/A"
                                }*/
                            ]
                        });

                        asyncOperations--;
                        if(asyncOperations <= 0){
                            resolve(result);
                        }
                    })
                                                  
                }
                else{
                    toastr.error(element+"Uninstall.exe does not exists");
                }

            });
        })
        
    }

    function putDataIntoJSON(searchPaths,allUnity)
    {
        var res = {
            unity:allUnity,
            searchPaths:searchPaths,
        }
        try{
            fs.writeFileSync('./config/unityPaths.json',JSON.stringify(res));
            Globals.update();
            return true;
        }catch(e){
            return false;
            
        }


        
            
    }

    $scope.removePath = function(e)
    {
        debugger;
        var tmp = Globals.searchPaths;
        var id  = tmp.indexOf(e.key);
        if(id<0) return toastr.error("Such path does not exists! deletion was unsuccessful");
        
        Globals.searchPaths.splice(id,1);
        Globals.save();
        Globals.update();
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