const umzugInitializer = require('init_umzug');
const cfResponse = require('cfresponse');

exports.handler = async (event, context) => {
    umzug = umzugInitializer.init('./migrations', 'migrations');
    try {
        migrations = await umzug.up();
        console.log(migrations);
        cfResponse.send(event, context, cfResponse.SUCCESS, {});
    } catch (error) {
        console.log(error);
        cfResponse.send(event, context, cfResponse.FAILED, {});
        return false;
    }
    return true;
};