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
        type: DataTypes.STRING(255),
        allowNull: true
      });
      await queryInterface.addColumn('users', 'password', {
        type: DataTypes.STRING(255),
        allowNull: true
      });
      await queryInterface.addColumn('users', 'new_email', {
        type: DataTypes.STRING(500),
        allowNull: true
      });
      await queryInterface.removeColumn('users', 'cognito_id');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  down: async (queryInterface, DataTypes) => {
    try {
      await queryInterface.removeColumn('users', 'status');
      await queryInterface.removeColumn('users', 'confirm_token');
      await queryInterface.removeColumn('users', 'password');
      await queryInterface.removeColumn('users', 'new_email');
      await queryInterface.addColumn('users', 'cognito_id', {
        type: DataTypes.TEXT,
        allowNull: true
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
