const { exec } = require('child_process');

async function getStatus(serviceName) {
    return new Promise(function (resolve, reject) {
        exec(`systemctl status ${serviceName}`,  async function (error, stdout, stderr) {
            if (error) {
                console.log(`error: ${error.message}`);
                reject(error.message);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);            
            }
            
            resolve((stdout.includes("active")) ? `\\[\\+\\] ${serviceName}` : `\\[\\-\\] ${serviceName}`);
        })
    })
}
