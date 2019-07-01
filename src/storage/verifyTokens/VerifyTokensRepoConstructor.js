const db = require('../../Utils/Constructors/DBConnectionConstructor');
const VerifyTokensRepo = require('./VerifyTokensRepo');

module.exports = new VerifyTokensRepo(db);