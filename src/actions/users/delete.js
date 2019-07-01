const ResponseBuilder = require('../../Utils/ResponseBuilder');

exports.handler = async (event, context) => {
  if (event.keep_alive_request) { return {}; }
  //TODO: find user
  //TODO: delete files from s3
  //TODO: delete user
  return ResponseBuilder.successEmpty();
};
