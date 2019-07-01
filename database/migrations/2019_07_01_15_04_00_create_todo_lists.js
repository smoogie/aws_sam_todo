const Sequelize = require('sequelize');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('todo_lists', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: 'users',
          key: 'id'
        }
      },
      title: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: equelize.fn('NOW')
      }
    });
  },

  down(queryInterface, DataTypes) {
    return queryInterface.dropTable('todo_lists');
  }
};
