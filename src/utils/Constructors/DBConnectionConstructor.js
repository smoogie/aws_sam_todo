const mysql = require('mysql2/promise');
const DBConnection = require('../DBConnection');
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

module.exports = new DBConnection(mysql, config);
