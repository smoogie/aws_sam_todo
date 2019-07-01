const umzugInitializer = require('./init_umzug');
const cfResponse = require('./cfresponse');

exports.handler = async (event, context) => {
  let response = true;
  try {
    const requestType = event.RequestType.toLowerCase();
    if (requestType === 'create' || requestType === 'update') {
      const umzug = umzugInitializer.init('./migrations', 'migrations');
      const migrations = await umzug.up();
      console.log(migrations);
    }
    response = await cfResponse.send(event, context, cfResponse.SUCCESS, {});
  } catch (error) {
    console.log(error);
    response = await cfResponse.send(event, context, cfResponse.FAILED, {});
  }
  return response;
};
