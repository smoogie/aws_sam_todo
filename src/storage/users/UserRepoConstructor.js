const db = require('../../Utils/Constructors/DBConnectionConstructor');
const UserRepo = require('./UserRepo');

module.exports = new UserRepo(db);