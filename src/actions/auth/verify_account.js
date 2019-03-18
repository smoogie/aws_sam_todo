const db = require('../../utils/db_connection');

exports.handler = async (event, context) => {
  const { token } = event.params.querystring;
  let text = "Can't find user";
  try {
    const connection = await db.connect();
    const [rows, fields] = await connection.execute('SELECT * FROM `users` WHERE `confirm_token` = ?', [token]);
    if (rows !== undefined && rows != null && rows.length > 0) {
      const user = rows[0];
      text = `Hello ${user.firstName} ${user.lastName}`;
    }
    connection.end();
  } catch (error) {
    console.log(error);
  }
  const response = {
    statusCode: 200,
    headers: {
      ContentType: 'text/html'
    },
    body: `<html><body><p>${text}</p></body></html>`
  };
  return response;
};
