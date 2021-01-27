const { exec } = require('child_process');

async function piHoleStatus() {
    return new Promise(function (resolve, reject) {
        exec("bash ./ScriptBash/PiHoleStatusScript.sh",  async function (error, stdout, stderr) {
            if (error) {
                console.log(`error: ${error.message}`);
                reject();
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);            
            }
            let res = stdout.split('\\')[0];
            resolve(res);               
        })
    })       
}

module.exports = {piHoleStatus}