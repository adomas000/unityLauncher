/**
 * using electron api calling file selection dialog
 */

const electron = require('electron').remote;
const dialog = electron.dialog;
var promise = require("promise");


module.exports = {
    dialog:dialog,
    selectDirectory:function() {

        return new promise(function(resolve,reject){
            //properties lets me to let user choose either file or whole directory or even multiple files
            dialog.showOpenDialog({
                properties: ['openDirectory']
            },(filename)=>
            {
                if(!filename) reject(filename);
                else resolve(filename);   
            });
        })
        
    }
    
}
    

