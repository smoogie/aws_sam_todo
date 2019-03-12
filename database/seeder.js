const umzugInitializer = require('./init_umzug');
const cfResponse = require('./cfresponse');

exports.handler = async (event, context) => {
  const umzug = umzugInitializer.init('./seeds', 'seeds');
  try {
    const migrations = await umzug.up();
    console.log(migrations);
    const cfResult = await cfResponse.send(event, context, cfResponse.SUCCESS, {});
  } catch (error) {
    console.log(error);
    cfResponse.send(event, context, cfResponse.FAILED, {});
    return false;
  }
  return true;
};
