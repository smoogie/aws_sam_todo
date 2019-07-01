const Sequelize = require('sequelize');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('access_tokens', {
      token: {
        type: DataTypes.STRING(500),
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: 'users',
          key: 'id'
        }
      },
      refresh_token: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true
      },
      scope: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      validate_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      validate_refresh_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('access_tokens');
  }
};
