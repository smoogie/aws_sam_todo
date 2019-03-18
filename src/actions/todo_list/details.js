const db = require('../../utils/db_connection');

async function getList(listId) {
    let list = null;
    return list;
}

async function validateOwnership(list, userId) {
    return list.userId == userId;
}

exports.handler = async (event, context) => {
    const { userId } = event.context;
    const { listId } = event.params.path;
    let response = {
        statusCode: 200,
        body: ""
    };
    const list = getList(listId);
    if (list === null) {
        response.statusCode = 404;
        response.error = 'Not found';
        throw new Error(JSON.stringify(response));
    }
    if(validateOwnership(list, userId)) {
        response.statusCode = 403;
        response.error = 'Unauthorized';
        throw new Error(JSON.stringify(response));
    }
    response.body = list;
    return response;
};
