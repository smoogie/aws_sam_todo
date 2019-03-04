const mysql = require('mysql2/promise');
const connectionOption = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

exports.connect = async () => {
    const connection =  await mysql.createConnection(connectionOption);
    return connection;
}