class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.google_id = data.google_id;
    this.status = data.status;
    this.email_verified_at = data.email_verified_at;
    this.last_login = data.last_login;
    this.created_at = data.created_at;
  }
  get googleId() {
    return this.google_id;
  }
  set googleId(data) {
    this.google_id = data;
  }
  get emailVerifiedAt() {
    return this.email_verified_at;
  }
  set emailVerifiedAt(data) {
    this.email_verified_at = data;
  }
  get lastLogin() {
    return this.last_login;
  }
  set lastLogin(data) {
    this.last_login = data;
  }
  get createdAt() {
    return this.created_at;
  }
  set createdAt(data) {
    this.created_at = data;
  }
}

module.exports = User;