const ResponseBuilder = require('../../Utils/ResponseBuilder');

exports.handler = async (event, context) => {
  if (event.keep_alive_request) { return {}; }
  //TODO: validate request
  //TODO: build page
  //TODO: return response
  const text = 'Test';
  return ResponseBuilder.html(`<html><body><p>${text}</p></body></html>`);
};
