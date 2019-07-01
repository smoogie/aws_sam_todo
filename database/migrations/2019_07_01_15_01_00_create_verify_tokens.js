const Sequelize = require('sequelize');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('verify_tokens', {
      token: {
        type: DataTypes.STRING(500),
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      new_email: {
        type: DataTypes.TEXT,
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
    return queryInterface.dropTable('verify_tokens');
  }
};
