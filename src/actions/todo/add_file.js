const s3PathBuilder = require('../../utils/s3_path_builder');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();
const fileTypeFun = require('file-type');

exports.handler = async (event, context) => {
    // Get params
    const userId = event.context.cognitoIdentityId;
    const todoId = event.params.path.todoId;
    const jsonBody = event.bodyJson;
    // set file vars
    const buffer = new Buffer( jsonBody.file, 'base64');
    const fileTpe = fileTypeFun(buffer);
    if (fileTpe === null) {
        return context.fail('File type not supported');
    }
    const itemPath = s3PathBuilder.buildItemId('todo', todoId, fileTpe.ext);
    const fileInfo = { url: s3PathBuilder.buildUrl(itemPath) };
    // set s3 params
    const options =  { Bucket: s3PathBuilder.bucket, Key: itemPath, Body: buffer };
    // set response var
    let response = {}
    // try to save file on s3
    try {
        const s3Result = await s3.putObject(options).promise();
        response = {
            'statusCode': 200,
            'body': JSON.stringify(fileInfo)
        }
    } catch (error) {
        console.log(error);
        response = {
            'statusCode': 500,
            'body': error
        }
    }
    return response;
};