const db = require('../../Utils/Constructors/DBConnectionConstructor');
const AccessTokenRepo = require('./AccessTokenRepo');

module.exports = new AccessTokenRepo(db);