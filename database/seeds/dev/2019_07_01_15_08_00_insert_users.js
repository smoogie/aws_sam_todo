const Sequelize = require('sequelize');
const crypto = require('crypto');

const password = crypto.pbkdf2Sync('Test1234!', process.env.SALT, 100000, 64, 'sha512').toString('hex');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      email: 'aws-todo-test@mailinator.com',
      password,
      status: 1,
      email_verified_at: Sequelize.fn('NOW')
    },{
      id: 2,
      email: 'aws-todo-tes2t@mailinator.com',
      password,
      status: 1,
      email_verified_at: Sequelize.fn('NOW')
    }]);
  }
};
