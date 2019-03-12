/* eslint-disable */
const https = require('https');
const url = require('url');

exports.SUCCESS = 'SUCCESS';
exports.FAILED = 'FAILED';
exports.send = (event, context, status, data) => {
  return new Promise((resolve, reject) => {
    console.log('Init response for CF');
    const responseBody = JSON.stringify({
      Status: status,
      Reason: 'See the details in CloudWatch Log Stream: ' + context.logStreamName,
      PhysicalResourceId: context.logStreamName,
      StackId: event.StackId,
      RequestId: event.RequestId,
      LogicalResourceId: event.LogicalResourceId,
      Data: data
    });
    const responseUrl = url.parse(event.ResponseURL);
    console.log(responseUrl);
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
      console.log(`Status code ${response.statusCode}, message: ${response.statusMessage}`);
      resolve(context.done());
    });
    console.log('request created');
    req.on('error', (err) => {
      console.log(`Error on handling confirmation to CF: ${err}`);
      reject(reject(context.done(error)));
    });
    console.log('on error ready');
    req.write(responseBody);
    console.log('after response');
    req.end();
  });
}