const umzugInitializer = require('init_umzug');
const cfResponse = require('cfresponse');

exports.handler = async (event, context) => {
    umzug = umzugInitializer.init('./migrations', 'migrations');
    if (event.RequestType === 'Delete') {
        let cfResult = await cfResponse.send(event, context, cfResponse.SUCCESS, {});
        return true;
    }
    try {
        migrations = await umzug.up();
        console.log(migrations);
        let cfResult = await cfResponse.send(event, context, cfResponse.SUCCESS, {});
    } catch (error) {
        console.log(error);
        let cfResult = await cfResponse.send(event, context, cfResponse.FAILED, {});
        return false;
    }
    return true;
};