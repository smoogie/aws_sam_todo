const sqs = require('../../utils/sqs_mail_helper');

async function sendMail(params) {
  console.log(params);
}

exports.handler = async (event, context) => {
  event.Records.forEach((record) => {
    const params = sqs.getMailParams(record);
    sendMail(params);
  });
  return {};
};
