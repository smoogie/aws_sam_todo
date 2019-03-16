const db = require('../../utils/db_connection');

exports.handler = async (event, context) => {
    const { userId } = event.context;
    const {bodyJson} = event;
    const response = {
        statusCode: 200,
        body: ""
    };
    return response;
};
