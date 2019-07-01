const ResponseBuilder = require('../../Utils/ResponseBuilder');

exports.handler = async (event, context) => {
  if (event.keep_alive_request) { return {}; }
  //TODO: validate request
  //TODO: update db
  //TODO: build response and send validation email if required
  return ResponseBuilder.success({success: true});
};
