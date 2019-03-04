const Promise = require('bluebird');
const Sequelize = require('sequelize');

module.exports = {
    up: function(queryInterface, DataTypes) {
        return queryInterface.bulkInsert('system_versions', [{
            weight: 1,
            system: 'ios',
            version: 'test',
            min: true
        }]);
    },
    down: function(queryInterface, DataTypes) {
    }
};