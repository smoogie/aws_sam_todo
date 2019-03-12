const Promise = require('bluebird');
const Sequelize = require('sequelize');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.bulkInsert('system_versions', [{
      weight: 1,
      system: 'ios',
      version: 'test',
      min: true
    }]);
  },
  down(queryInterface, DataTypes) {
  }
};
