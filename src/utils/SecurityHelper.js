class SecurityHelper {
  constructor(crypto, salt) {
    this.crypto = crypto;
    this.salt = salt;
  }

  generateToken(base, suffix = '') {
    const now = Date.now();
    const hash = this.crypto.createHmac('sha256', `${base}${now}`).digest('hex');
    return `${hash}${suffix}`
  }

  generateVerificationToken(email) {
    return this.generateToken(`${email}verification`)
  }

  generateAccessToken(email, userId) {
    return this.generateToken(`${email}access`, userId)
  }

  generateRefreshToken(email, userId) {
    return this.generateToken(`${email}refreshToken`, userId)
  }

  generateResetPasswordToken(email, userId) {
    return this.generateToken(`${email}reset`, userId)
  }

  hashPassword(password) {
    return this.crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex');
  }

  verify(password, hash) {
    const passHash = this.hashPassword(password);
    return (hash === passHash);
  }
}

module.exports = SecurityHelper;