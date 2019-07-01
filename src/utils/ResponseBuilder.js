const HttpFailError = require('../Errors/HttpFailError');
const ValidationError = require('../Errors/ValidationError');

class ResponseBuilder {
  static success(body) {
    return {
      statusCode: 200,
      body: JSON.stringify(body)
    };
  }

  static successCreated(body) {
    return {
      statusCode: 201,
      body: JSON.stringify(body)
    };
  }

  static successEmpty() {
    return {
      statusCode: 204,
    };
  }

  static html(body) {
    return {
      statusCode: 200,
      headers: {
        ContentType: 'text/html'
      },
      body
    };
  }
  static unauthenticated() {
    const response = {
      statusCode: 401,
      errors: 'Unauthenticated'
    };
    throw new HttpFailError(JSON.stringify(response));
  }

  static unauthorized() {
    const response = {
      statusCode: 403,
      errors: 'Unauthorized'
    };
    throw new HttpFailError(JSON.stringify(response));
  }

  static notFound() {
    const response = {
      statusCode: 404,
      errors: 'Not Found'
    };
    throw new HttpFailError(JSON.stringify(response));
  }

  static invalidInput(errors) {
    const response = {
      statusCode: 422,
      errors: errors
    };
    throw new HttpFailError(JSON.stringify(response));
  }

  static error(error) {
    const response = {
      statusCode: 500,
      errors: error
    };
    throw new HttpFailError(JSON.stringify(response));
  }

  static handleError(error) {
    if (error instanceof HttpFailError) {
      throw error;
    } else if (error instanceof ValidationError) {
      ResponseBuilder.invalidInput(error.errors);
    } else {
      ResponseBuilder.error(error);
    }
  }
}

module.exports = ResponseBuilder;