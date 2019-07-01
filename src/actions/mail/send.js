const sqs = require('../../Utils/SqsMailHelper');

async function sendMail(params) {
  console.log(params);
}

exports.handler = async (event, context) => {
  if (event.keep_alive_request) { return {}; }
  event.Records.forEach((record) => {
    const params = sqs.getMailParams(record);
    sendMail(params);
  });
  return {};
};
