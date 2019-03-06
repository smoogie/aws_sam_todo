const https = require("https");
const url = require("url");

module.exports = {
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
    send(event, context, responseStatus, responseData) {
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
            hostname: parsedUrl.hostname,
            port: 443,
            path: parsedUrl.path,
            method: "PUT",
            headers: {
                "content-type": "",
                "content-length": responseBody.length
            }
        };

        const request = https.request(options, (response) => {
            console.log("Status code response from CF: " + response.statusCode);
            console.log("Status message response from CF: " + response.statusMessage);
            context.done();
        });

        request.on("error", (error) => {
            console.log("Error sending CF response: " + error);
            context.done();
        });

        request.write(responseBody);
        request.end();
    }
}