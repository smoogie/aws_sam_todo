const pug = require('pug');

class HtmlRenderer {
  static render(template, params) {
    const html = pug.renderFile(
      `${__dirname}/../pages/${template}.pug`,
      { params }
    );
    return html;
  }
}

module.exports = HtmlRenderer;