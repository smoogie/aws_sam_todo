const sgMail = require('@sendgrid/mail');

class MailHelper {
  constructor(htmlRenderer, config) {
    this.htmlRenderer = htmlRenderer;
    this.config = config;
  }

  sendMail(to, subject, template, templateParams) {
    sgMail.setApiKey(this.config.sendGridKey);
    const html = this.htmlRenderer.render(template, Object.assign({}, templateParams, {domain: this.config.domain}));
    const msg = { to, from: this.config.fromEmail, subject, html };
    sgMail.send(msg);
  }
}