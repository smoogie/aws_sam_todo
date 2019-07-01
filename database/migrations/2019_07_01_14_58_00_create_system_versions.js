const Sequelize = require('sequelize');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('system_versions', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      system: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      version: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      is_min: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('system_versions');
  }
};
