var fs = require("fs");
var _path = require("path");
const _dir = _path.dirname(_path.dirname(_path.dirname(__dirname)));

angular.module("App")

.service("Globals",function(){
    this.unity = [];
    this.searchPaths = [];

    this.save = function(){
        var tmp = {
            unity:this.unity,
            searchPaths:this.searchPaths
        };
        fs.writeFileSync(_dir+"\\config\\unityPaths.json",JSON.stringify(tmp));
    }

    this.update = function(){
       var tmp = fs.readFileSync(_dir+"\\config\\unityPaths.json","utf-8");
       tmp = JSON.parse(tmp);
       this.unity = tmp.unity;
       this.searchPaths = tmp.searchPaths;
    }
})