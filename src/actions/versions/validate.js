exports.handler = async (event, context) => {
    const response = {
        'statusCode': 200,
        'body': JSON.stringify({
            accepted: true
        })
    }
    return response;
};