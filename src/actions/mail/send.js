const sqs = require('../../utils/sqs_mail_helper');

async function sendMail(params) {
    console.log(params);
}

exports.handler = async function(event, context) {
    event.Records.forEach(record => {
        params = sqs.getMailParams(record);
        sendMail(params);
    });
    return {};
}