const SqsObject = require('aws-sdk/clients/sqs');

const sqs = new SqsObject({ apiVersion: '2012-11-05' });

exports.queue = process.env.SQS_MAIL_URL;
exports.buildParams = (receiver, lang, template, params = {}) => ({
  DelaySeconds: 10,
  MessageAttributes: {
    receiver: {
      DataType: 'String',
      StringValue: receiver
    },
    lang: {
      DataType: 'String',
      StringValue: lang
    },
    template: {
      DataType: 'String',
      StringValue: template
    },
    params: {
      DataType: 'String',
      StringValue: JSON.stringify(params)
    }
  },
  MessageBody: 'email',
  QueueUrl: process.env.SQS_MAIL_URL
});
exports.send = params => sqs.sendMessage(params).promise();
exports.getMailParams = (record) => {
  const receiver = record.messageAttributes.receiver.stringValue;
  const template = record.messageAttributes.template.stringValue;
  const lang = record.messageAttributes.lang.stringValue;
  const paramsString = record.messageAttributes.params.stringValue;
  const params = JSON.parse(paramsString);
  return {
    receiver, template, lang, params
  };
};
