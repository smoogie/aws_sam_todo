const Sequelize = require('sequelize');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('password_resets', {
      token: {
        type: DataTypes.STRING(500),
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('password_resets');
  }
};
