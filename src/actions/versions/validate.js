const db = require('../../utils/db_connection');

exports.handler = async (event, context) => {
    let accepted = false;
    const version = event.params.querystring.version;
    try {
        const connection = await db.connect();
        const [rows, fields] = await connection.execute('SELECT * FROM `system_versions` WHERE `version` = ?', [version]);
        if (rows != undefined && rows != null && rows.length > 0) {
            accepted = true;
        }
        connection.end();
    } catch (error) {
        console.log(error);
    }

    const response = {
        'statusCode': 200,
        'body': JSON.stringify({
            accepted: accepted
        })
    }
    return response;
};