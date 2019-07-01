const ResponseBuilder = require('../../Utils/ResponseBuilder');

exports.handler = async (event, context) => {
    if (event.keep_alive_request) { return {}; }
    //TODO: verify ownership
    //TODO: get data from s3
    //TODO: return response
    return ResponseBuilder.success({success: true});
};
