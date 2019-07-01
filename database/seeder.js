const umzugInitializer = require('./init_umzug');
const cfResponse = require('./cfresponse');

exports.handler = async (event, context) => {
  let response = true;
  try {
    const requestType = event.RequestType.toLowerCase();
    if (requestType === 'create' || requestType === 'update') {
      const stage = process.env.STAGE;
      let paths = ['./seeds/production'];
      if (stage === 'dev') {
        paths.push('./seeds/dev');
      }
      for (path in paths) {
        const umzug = umzugInitializer.init(path, 'seeds');
        const migrations = await umzug.up();
        console.log(migrations);
      }
    }
    response = await cfResponse.send(event, context, cfResponse.SUCCESS, {});
  } catch (error) {
    console.log(error);
    response = await cfResponse.send(event, context, cfResponse.FAILED, {});
  }
  return response;
};
