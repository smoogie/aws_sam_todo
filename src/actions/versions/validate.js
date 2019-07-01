const ResponseBuilder = require('../../Utils/ResponseBuilder/ResponseBuilder');
const Validator = require('../../Validators/Validator');
const versionRepo = require('../../storage/VersionRepoConstructor');

exports.handler = async (event) => {
  if (event.keep_alive_request) {
    return {};
  }
  let accepted = false;
  try {
    const { version, system } = event.params.querystring;
    const validation = Validator({
      version:['required'],
      system:['required']
    });
    const sanitized = validation.validate({system, version});
    const systemVersion = await versionRepo.find(sanitized.system, sanitized.version);
    if (!systemVersion) {
      ResponseBuilder.notFound();
    }
    const minVersion = await versionRepo.getMinVersion(sanitizedData.system);
    if (minVersion instanceof Version || minVersion.weight <= systemVersion.weight) {
      accepted = true;
    }
  } catch (error) {
    ResponseBuilder.handleError(error);
  }
  return ResponseBuilder.success({ accepted });
};
