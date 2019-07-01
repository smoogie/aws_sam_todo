const https = require('https');
const url = require('url');

exports.SUCCESS = 'SUCCESS';
exports.FAILED = 'FAILED';
exports.send = (event, context, status, data) => new Promise((resolve, reject) => {
  const physicalResourceId = event.PhysicalResourceId !== undefined ? event.PhysicalResourceId : context.logStreamName;
  const responseBody = JSON.stringify({
    Status: status,
    Reason: `See the details in CloudWatch Log Stream: ${context.logStreamName}`,
    PhysicalResourceId: physicalResourceId,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: data
  });
  const responseUrl = url.parse(event.ResponseURL);
  const options = {
    hostname: responseUrl.hostname,
    port: 443,
    path: responseUrl.path,
    method: 'PUT',
    headers: {
      'content-type': '',
      'content-length': responseBody.length
    }
  };
  const req = https.request(options, (res) => {
    console.log(`Status code ${res.statusCode}, message: ${res.statusMessage}`);
    resolve(context.done());
  });
  req.on('error', (error) => {
    console.log(`Error on handling confirmation to CF: ${error}`);
    reject(context.done(error));
  });
  req.write(responseBody);
  req.end();
});
