class PasswordReset {
  constructor(data) {
    this.token = data.token;
    this.user_id = data.user_id;
    this.created_at = data.created_at;
  }
  get userId() {
    return this.user_id;
  }
  set userId(data) {
    this.user_id = data;
  }
  get createdAt() {
    return this.created_at;
  }
  set createdAt(data) {
    this.created_at = data;
  }
}

module.exports = PasswordReset;