const ResponseBuilder = require('../../Utils/ResponseBuilder');

exports.handler = async (event, context) => {
    if (event.keep_alive_request) { return {}; }
    //TODO: verify ownership
    //TODO: delete file on s3
    //TODO: delete file from db
    //TODO: return response
    return ResponseBuilder.successEmpty();
};
