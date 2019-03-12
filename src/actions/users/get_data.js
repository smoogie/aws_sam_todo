const db = require('../../utils/db_connection');

exports.handler = async (event, context) => {
  let user = {};
  const userId = event.context['cognito-identity-id'];
  try {
    const connection = await db.connect();
    const [rows, fields] = await connection.execute('SELECT * FROM `users` WHERE `cognito_id` = ?', [userId]);
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
