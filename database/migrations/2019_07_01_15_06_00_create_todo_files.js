const Sequelize = require('sequelize');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('todo_files', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: 'todo_items',
          key: 'id'
        }
      },
      bucket: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      region: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      file_name: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      path_origin: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      path_minimize: {
        type: DataTypes.STRING(500),
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
    return queryInterface.dropTable('todo_files');
  }
};
