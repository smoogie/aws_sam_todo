const ResponseBuilder = require('../../Utils/ResponseBuilder');

exports.handler = async (event, context) => {
    if (event.keep_alive_request) { return {}; }
    //TODO: validate request
    //TODO: verify ownership
    //TODO: update list
    //TODO: return response
    return ResponseBuilder.success({success: true});
};
