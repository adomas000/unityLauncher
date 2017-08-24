var walker = require("walker");
var pathutil = require("path");
var fs = require('fs');
var start = new Date();
var unity = [];
var count=0;
var unityCount=0;

walker('D:\\UnityVersions')
  .on('dir', function(dir, stat){
        
        console.log(dir);
        count++;
        if(pathutil.basename(dir) == "Editor")
        {
          if(fs.existsSync(dir+"\\Unity.exe"))
          {
            unity.push(dir);
            unityCount++;
          }
            
        }

}).on('end', () => {
        var end = new Date() - start;
        console.log("\n\nFINNISHED\n\n");

        console.log("Execution time: ", end/1000+ "s");
        console.log("\nFILES: ");
        console.log(count);
        console.log("\nUNITY: ");
        console.log(unityCount);
        console.log("\nUNITY PATHS: ");
        unity.forEach(function(el){
          console.log(el);
        });
})

    