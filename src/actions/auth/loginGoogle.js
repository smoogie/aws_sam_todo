const ResponseBuilder = require('../../Utils/ResponseBuilder');

exports.handler = async (event, context) => {
  if (event.keep_alive_request) { return {}; }
  //TODO: validate request
  //TODO: verify credentials with google
  //TODO: generate access token
  //TODO: return response
  return ResponseBuilder.success({success: true});
};
