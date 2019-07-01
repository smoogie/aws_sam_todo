const Repo = require('../Repo');
const User = require('./User');

class UserRepo extends Repo {
  constructor(db) {
    super(db, 'users');
  }

  hydrate(data) {
    return new User(data);
  }
}

module.exports = UserRepo;