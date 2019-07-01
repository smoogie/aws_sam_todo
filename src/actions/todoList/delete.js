const ResponseBuilder = require('../../Utils/ResponseBuilder');

exports.handler = async (event, context) => {
    if (event.keep_alive_request) { return {}; }
    //TODO: verify ownership
    //TODO: delete files on s3
    //TODO: delete element
    //TODO: return response
    return ResponseBuilder.successEmpty();
};
