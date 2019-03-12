const Sequelize = require('sequelize');

const db = {
  sequelize: new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST
  }),
  Sequelize
};

module.exports = db;
