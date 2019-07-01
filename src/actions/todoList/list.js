const ResponseBuilder = require('../../Utils/ResponseBuilder');

exports.handler = async (event, context) => {
    if (event.keep_alive_request) { return {}; }
    //TODO: get lists
    //TODO: build response
    return ResponseBuilder.success({success: true});
};
