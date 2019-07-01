const WrongFormatError = require('../Errors/UnknowMimeError');

class FileHelper {
  constructor(fileType) {
    this.fileType = fileType;
  }

  getFileData(fileBase64) {
    const buffer = Buffer.from(fileBase64, 'base64');
    const fileMime = this.fileType(buffer);
    const error = {};
    if (fileMime === null) {
      throw new UnknowMimeError();
    }
    return { fileMime, buffer };
  }
}

module.exports = FileHelper;
