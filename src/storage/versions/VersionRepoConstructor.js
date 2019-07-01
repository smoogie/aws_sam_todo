const db = require('../../Utils/Constructors/DBConnectionConstructor');
const VersionRepo = require('./VersionRepo');

module.exports = new VersionRepo(db);