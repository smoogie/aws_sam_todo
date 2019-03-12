const umzugInitializer = require('./init_umzug');
const cfResponse = require('./cfresponse');

exports.handler = async (event, context) => {
  const umzug = umzugInitializer.init('./migrations', 'migrations');
  if (event.RequestType === 'Delete') {
    const cfResult = await cfResponse.send(event, context, cfResponse.SUCCESS, {});
    return true;
  }
  try {
    const migrations = await umzug.up();
    console.log(migrations);
    const cfResult = await cfResponse.send(event, context, cfResponse.SUCCESS, {});
  } catch (error) {
    console.log(error);
    const cfResult = await cfResponse.send(event, context, cfResponse.FAILED, {});
    return false;
  }
  return true;
};
