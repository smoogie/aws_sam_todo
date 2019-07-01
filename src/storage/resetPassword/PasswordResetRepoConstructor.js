const db = require('../../Utils/Constructors/DBConnectionConstructor');
const PasswordResetRepo = require('./PasswordResetRepo');

module.exports = new PasswordResetRepo(db);