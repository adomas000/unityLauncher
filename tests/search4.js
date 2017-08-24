var walker = require("filewalker");
var pathutil = require("path");
var fs = require('fs');
var start = new Date();
var unity = [];
var count=0;
var unityCount=0;

var base = 'D:\\UnityVersions\\';

walker('D:\\UnityVersions')
  .on('dir', function(dir){
      //console.log(base+dir);
        count++;
        if(pathutil.basename(dir) == "Editor")
        {
          if(fs.existsSync(base+dir+"\\Unity.exe"))
          {
            unity.push(dir);
            unityCount++;
          }
            
        }

}).on('done', () => {
        var end = new Date() - start;
        console.log("\n\nFINNISHED\n\n");

        console.log("Execution time: ", end/1000+ "s");
        console.log("\nFILES: ");
        console.log(count);
        console.log("\nUNITY: ");
        console.log(unityCount);
        console.log("\nUNITY PATHS: ");
        unity.forEach(function(el){
          console.log(base + el);
        });
}).walk();

    