const accessTokenRepo = require('../../storage/accessTokens/AccessTokenRepoConstructor');
const AccessToken = require('../../storage/accessTokens/AccessToken');
const Validator = require('../../Validators/Validator');

function authResponse(principalId, methodArn, allowed = false) {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: allowed ? 'Allow' : 'Deny',
          Resource: methodArn
        }
      ]
    }
  };
}

async function getUserId(token) {
    let id = null;
    const tokenObj = await accessTokenRepo.find(token);
    if (token instanceof AccessToken) {
      id = tokenObj.user_id;
    }
    return id;
}

exports.handler = async (event, context) => {
  if (event.keep_alive_request) { return {}; }
  try {
    const { authorizationToken, methodArn } = event;
    const validation = new Validator({authorizationToken:['required', 'text']});
    let token = null;
    try {
      validation.validate({authorizationToken});
      token = validation.sanitizedData.authorizationToken;
    } catch(error){
        context.fail('Unauthorized');
        return null;
    }
    const principalId = getUserId(token);
    const allowed = principalId !== null;
    return authResponse(principalId, methodArn, allowed);
  } catch (error) {
    console.log(error);
    context.fail('Internal Server Error');
    return null;
  }
};
