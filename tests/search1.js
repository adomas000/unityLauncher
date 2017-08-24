//var proc = require("child_process");
//var filewalker = require("filewalker");


var walk = require('walk')
    , walker;

var count=0;
var unityCount=0;

walker = walk.walk("D:\\UnityVersions",[]);
var start = new Date();

walker.on("directories", function (root, dirs, next) {

    
    dirs.forEach(function(element) {
        count++;
        console.log(root+"\\"+element.name);
    });
    if(dirs.length==2)
    {
        if(dirs[0].name == "Editor" && dirs[1].name== "MonoDevelop")
        {

            console.log(root+"\\"+dirs[0].name);
            unityCount++;
            //walker = walk.walk(path.dirname(root),{filters: $scope.options.skipDirectories});

        }
    }  
    next();
});

walker.on('end',function(){
    var end = new Date() - start;

    console.log("\n\nFINNISHED\n\n");

    console.log("Execution time: ", end/1000+ "s");
    console.timeEnd("exec1");
    console.log("\nFILES: ");
    console.log(count);
    console.log("\nUNITY: ");
    console.log(unityCount);
})

walker.on('errors',function(){
    var end = new Date() - start;

    console.log("\n\nFINNISHED\n\n");

    console.log("Execution time: ", end/1000+ "s");
    console.log("\nFILES: ");
    console.log(count);
    console.log("\nUNITY: ");
    console.log(unityCount);
})