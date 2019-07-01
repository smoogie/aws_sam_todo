const ResponseBuilder = require('../../Utils/ResponseBuilder');

exports.handler = async (event, context) => {
  if (event.keep_alive_request) { return {}; }
  //TODO: validate request
  //TODO: create user
  //TODO: generate verify token
  //TODO: send mail + generate mail
  //TODO: return response
  return ResponseBuilder.successCreated({success: true});
};
