const Sequelize = require('sequelize');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      google_id: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('users');
  }
};
