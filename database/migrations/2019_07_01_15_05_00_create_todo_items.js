const Sequelize = require('sequelize');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('todo_items', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      list_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: 'todo_lists',
          key: 'id'
        }
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      title: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: equelize.fn('NOW')
      }
    });
  },

  down(queryInterface, DataTypes) {
    return queryInterface.dropTable('todo_items');
  }
};
