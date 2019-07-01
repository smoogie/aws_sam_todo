class VerifyToken {
  constructor(data) {
    this.user_id = data.user_id;
    this.token = data.token;
    this.new_email = data.new_email;
    this.created_at = data.created_at;
  }
  get userId() {
    return this.user_id;
  }
  set userId(data) {
    this.user_id = data;
  }
  get newEmail() {
    return this.new_email;
  }
  set newEmail(data) {
    this.new_email = data;
  }
  get createdAt() {
    return this.created_at;
  }
  set createdAt(data) {
    this.created_at = data;
  }
}

module.exports = VerifyToken;