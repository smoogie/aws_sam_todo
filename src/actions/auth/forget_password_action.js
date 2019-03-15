exports.handler = async (event, context) => {
  const text = 'Test';
  const response = {
    statusCode: 200,
    headers: {
      ContentType: 'text/html'
    },
    body: `<html><body><p>${text}</p></body></html>`
  };
  return response;
};
