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

function getUserId(token) {
  let id = null;
  // if (token) {
  //   id = 1;
  // }
  return id;
}

exports.handler = async (event, context) => {
  try {
    const { authorizationToken, methodArn } = event;
    if (authorizationToken.length === 0) {
      context.fail('Unauthorized');
      return null;
    }
    const principalId = getUserId(authorizationToken);
    const allowed = principalId !== null;
    return authResponse(principalId, methodArn, allowed);
  } catch (error) {
    console.log(error);
    context.fail('Internal Server Error');
    return null;
  }
};
