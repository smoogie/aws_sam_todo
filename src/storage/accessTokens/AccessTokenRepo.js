const Repo = require('../Repo');
const AccessToken = require('./AccessToken');

class AccessTokenRepo extends Repo {
  constructor(db) {
    super(db, 'access_tokens', 'token');
  }

  hydrate(data) {
    return new AccessToken(data);
  }
}

module.exports = AccessTokenRepo;