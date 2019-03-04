const Promise = require('bluebird');
const Sequelize = require('sequelize');

module.exports = {
    up: function(queryInterface, DataTypes) {
        return queryInterface.createTable('system_versions', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            weight: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            system: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            version: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            min: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        });
    },

    down: function(queryInterface, DataTypes) {
        // return query.dropAllTables();
        return queryInterface.dropTable('system_versions');
    }
};