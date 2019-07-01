const ResponseBuilder = require('../../Utils/ResponseBuilder');

exports.handler = async (event, context) => {
    if (event.keep_alive_request) { return {}; }
    //TODO: verify ownership
    //TODO: delete s3 files
    //TODO: delete item
    //TODO: return response
    return ResponseBuilder.successEmpty();
};
