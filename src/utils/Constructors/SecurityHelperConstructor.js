const crypto = require('crypto');
const SecurityHelper = require('../SecurityHelper');

module.exports = new SecurityHelper(crypto, process.env.SALT);
