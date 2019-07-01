const ResponseBuilder = require('../../Utils/ResponseBuilder');

exports.handler = async (event, context) => {
  if (event.keep_alive_request) { return {}; }
  //TODO: validate request
  //TODO: verify ownership of item
  //TODO: add file to s3
  //TODO: add file in db
  //TODO: return response
  return ResponseBuilder.successCreated({success: true});
};
