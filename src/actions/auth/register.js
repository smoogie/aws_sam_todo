const crypto = require('crypto');
const db = require('../../utils/db_connection');
const sqs = require('../../utils/sqs_mail_helper');
const passwordUtil = require('../../utils/password');


async function createUser(data, token) {
  try {
    const connection = await db.connect();
    const password = passwordUtil.hashPassword(data.password);
    const [rows, fields] = await connection.execute(
        'INSERT INTO `users` (`email`, `firstName`, `lastName`, `createdAt`, `updatedAt`, `status`, `confirm_token`, `password`, `new_email`) VALUES\n'
        + '(?, ?, ?, NOW(), NOW(), 2, ?, ?, NULL);',
        [data.email, data.firstName, data.lastName, token, password]
    );
    connection.end();
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

exports.handler = async (event, context) => {
  let saved = false;
  const jsonBody = event.bodyJson;
  const now = Date.now();
  const hash = crypto.createHmac('sha256', `${jsonBody.email}${now}`).digest('hex');
  const token = `${hash}${now}`;
  const lang = event.params.querystring.lang ? event.params.querystring.lang : 'en';
  try {
    await createUser(jsonBody, token);
    const templateParams = {
      token: token,
      firstName: jsonBody.firstName,
      lastName: jsonBody.lastName
    };
    const params = sqs.buildParams(jsonBody.email, lang, 'register', templateParams);
    const sqsRes = await sqs.send(params);
    console.log(sqsRes);
    saved = true;
  } catch (error) {
    console.log(error);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({ saved })
  };
  return response;
};
