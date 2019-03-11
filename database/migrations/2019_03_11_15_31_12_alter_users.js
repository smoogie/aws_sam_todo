const Sequelize = require('sequelize');

module.exports = {
    up: async (queryInterface, DataTypes) => {
        try {
            await queryInterface.addColumn('users', 'status', {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 1
            });
            await queryInterface.addColumn('users', 'confirm_token', {
                type: DataTypes.TEXT,
                allowNull: true
            });
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(e);
        }
    },
    down: async (queryInterface, DataTypes) => {
        try {
            await queryInterface.removeColumn('users', 'status');
            await queryInterface.removeColumn('users', 'confirm_token');
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(e);
        }
    }
};