var fs = require("fs");

angular.module("App")

.service("Globals",function(){
    this.unity = [];
    this.searchPaths = [];

    this.save = function(){
        var tmp = {
            unity:this.unity,
            searchPaths:this.searchPaths
        };
        fs.writeFileSync("./config/unityPaths.json",JSON.stringify(tmp));
    }

    this.update = function(){
       var tmp = fs.readFileSync("./config/unityPaths.json");
       this.unity = tmp.unity;
       this.searchPaths = tmp.searchPaths;
    }
})