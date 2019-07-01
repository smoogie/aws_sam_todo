const ValidationError = require('../Errors/ValidationError');

class Validator {
  constructor(validation = {}) {
    this.rules = validation;
  }
  validate(data) {
    this.sanitizedData = {};
    this.errors = {};
    for (let field in this.rules) {
      const toVerify = data[field];
      let rule = this.rules[field];
      try {
        const sanitized = this.validateField(toVerify, rule);
        this.sanitizedData[field] = sanitized;
      } catch(error) {
        this.errors[field] = error;
      }
    }
    if(Object.keys(this.errors).length >0) {
      throw new ValidationError(this.errors);
    }
    return this.sanitizedData;
  }
  validateField(value, rules) {
    //TODO check validation selection and use correct validation class
    //TODO: Sanitize data
    let sanitizedData = value;
    return sanitizedData;
  }
}

module.exports =  Validator;