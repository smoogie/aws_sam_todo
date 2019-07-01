const Promise = require('bluebird');
const Sequelize = require('sequelize');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.bulkInsert('system_versions', [{
      weight: 1,
      system: 'ios',
      version: '0.1',
      min: true
    },
    {
      weight: 1,
      system: 'android',
      version: '0.1',
      min: true
    }]);
  },
  down(queryInterface, DataTypes) {
  }
};
