const ResponseBuilder = require('../../Utils/ResponseBuilder');

exports.handler = async (event, context) => {
  if (event.keep_alive_request) { return {}; }
  //TODO: validate request
  //TODO: generate token
  //TODO: send mail + build mail html
  //TODO: return response
  return ResponseBuilder.success({success: true});
};
