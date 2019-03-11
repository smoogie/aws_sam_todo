const db = require('../../utils/db_connection');
const sqs = require('../../utils/sqs_mail_helper');
const crypto = require('crypto');

async function createUser(data, token) {
    try {
        const connection = await db.connect();
        const [rows, fields] = await connection.execute(
            'INSERT INTO `users` (`email`, `firstName`, `lastName`, `cognito_id`, `createdAt`, `updatedAt`, `status`, `confirm_token`) VALUES\n' +
            '(?, ?, ?, NULL, NOW(), NOW(), 2, ?);',
            [data.email, data.firstName, data.lastName, token]);
        connection.end();
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.handler = async (event, context) => {
    let saved = false;
    const jsonBody = event.bodyJson;
    const hash = crypto.createHmac('sha256', jsonBody.email).digest('hex');
    const lang = event.params.querystring.lang ? event.params.querystring.lang : 'en';
    try {
        const token = Date.now();
        await createUser(jsonBody, hash);
        const templateParams = {
            token: hash,
            firstName: jsonBody.firstName,
            lastName: jsonBody.lastName
        }
        const params = sqs.buildParams(jsonBody.email, lang,'register', templateParams);
        let sqsRes = await sqs.send(params);
        console.log(sqsRes);
        saved = true;
    } catch (error) {
        console.log(error);
    }

    const response = {
        'statusCode': 200,
        'body': JSON.stringify({saved: saved})
    }
    return response;
};