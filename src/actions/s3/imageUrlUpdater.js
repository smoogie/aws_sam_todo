exports.handler = async (event, context) => {
  if (event.keep_alive_request) { return {}; }
  console.log(event);
  return {};
};
