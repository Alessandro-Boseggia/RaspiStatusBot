const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('LocalDatabase/serviceDB.json')
const serviceDB = low(adapter);

const initDataBase = () => {
    if(serviceDB.isEmpty().value()) {
        serviceDB.defaults({services: []}).write();
    }     
}

const insertService = (title, nameOfService) => {
    serviceDB.get('services')
    .push({title: title, nameOfService: nameOfService})
    .write();
}

module.exports = {initDataBase}