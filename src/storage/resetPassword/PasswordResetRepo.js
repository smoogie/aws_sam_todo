const Repo = require('../Repo');
const PasswordReset = require('./PasswordReset');

class PasswordResetRepo extends Repo {
  constructor(db) {
    super(db, 'password_resets', 'token');
  }

  hydrate(data) {
    return new PasswordReset(data);
  }
}

module.exports = PasswordResetRepo;