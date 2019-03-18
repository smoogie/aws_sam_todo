const crypto = require('crypto');
exports.hashPassword = password => crypto.pbkdf2Sync(password, process.env.SALT, 100000, 64, 'sha512').toString('hex');
exports.verify = (password, hash) => {
    const passHash = crypto.pbkdf2Sync(password, process.env.SALT, 100000, 64, 'sha512');
    const identicalHashes = hash === passHash.toString('hex');
    return identicalHashes;
}