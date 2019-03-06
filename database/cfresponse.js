const https = require("https");
const url = require("url");

function httpRequest(params, postData) {
    return new Promise((resolve, reject) => {
        var req = https.request(params, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                reject(new Error('statusCode=' + res.statusCode));
            }
            res.on('end', () => {
                resolve(res);
            });
        });
        req.on('error', (err) => {
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}

module.exports = {
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
    async send(event, context, responseStatus, responseData) {
        const responseBody = JSON.stringify({
            Status: responseStatus,
            Reason: "See the details in CloudWatch Log Stream: " + context.logStreamName,
            PhysicalResourceId: context.logStreamName,
            StackId: event.StackId,
            RequestId: event.RequestId,
            LogicalResourceId: event.LogicalResourceId,
            NoEcho: false,
            Data: responseData
        });
        const responseUrl = url.parse(event.ResponseURL);
        const options = {
            hostname: responseUrl.hostname,
            port: 443,
            path: responseUrl.path,
            method: "PUT",
            headers: {
                "content-type": "",
                "content-length": responseBody.length
            }
        };
        try {
            response = await httpRequest(options, responseBody);
            console.log("Status code response from CF: " + response.statusCode);
            console.log("Status message response from CF: " + response.statusMessage);
        } catch (error) {
            console.log(error);
        }
        context.done();
    }
}