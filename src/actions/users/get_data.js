const db = require('../../utils/db_connection');

exports.handler = async (event, context) => {
  const { userId } = event.context;
  let user = {};
  try {
    const connection = await db.connect();
    const [rows, fields] = await connection.execute('SELECT * FROM `users` WHERE `id` = ?', [userId]);
    if (rows !== undefined && rows != null && rows.length > 0) {
      user = rows[0];
    }
    connection.end();
  } catch (error) {
    console.log(error);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(user)
  };
  return response;
};
