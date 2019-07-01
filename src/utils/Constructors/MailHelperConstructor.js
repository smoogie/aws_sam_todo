const MailHelper = require('../MailHelper');
const HtmlRenderer = require('../HtmlRenderer');
const config = {
  sendGridKey: process.env.SENDGRID_KEY,
  fromEmail: process.env.MAIL_FROM_EMAIL,
  domain: process.env.DOMAIN
};

module.exports = new MailHelper(HtmlRenderer, config);