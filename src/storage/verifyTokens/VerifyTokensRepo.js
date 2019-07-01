const Repo = require('../Repo');
const VerifyToken = require('./VerifyToken');

class VerifyTokensRepo extends Repo {
  constructor(db) {
    super(db, 'verify_tokens', 'token');
  }

  hydrate(data) {
    return new VerifyToken(data);
  }
}

module.exports = VerifyTokensRepo;