const db = require('../../Utils/Constructors/DBConnectionConstructor');
const FileRepo = require('./FileRepo');

module.exports = new FileRepo(db);