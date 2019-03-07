const Sequelize = require('sequelize');

module.exports = {
    up: function(queryInterface, DataTypes) {
        return queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            firstName: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            lastName: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            cognito_id: {
                type: DataTypes.TEXT,
                allowNull: true
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
        return queryInterface.dropTable('system_versions');
    }
};