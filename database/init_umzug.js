const Umzug = require('umzug');
const database = require('./init_sequelize');

exports.init = (path, tableName) => {
  const umzugInstance = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: database.sequelize,
      tableName
    },
    logging: console.log,
    migrations: {
      params: [
        database.sequelize.getQueryInterface(),
        database.Sequelize
      ],
      path,
      pattern: /\.js$/
    }
  });

  return umzugInstance;
};
