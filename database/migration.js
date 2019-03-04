const umzugInitializer = require('init_umzug');

exports.handler = async (event, context) => {
    umzug = umzugInitializer.init('./migrations', 'migrations');
    try {
        migrations = await umzug.up();
        console.log(migrations);
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
};