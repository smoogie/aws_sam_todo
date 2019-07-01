class AccessToken {
  constructor(data) {
    this.token = data.token;
    this.user_id = data.user_id;
    this.refresh_token = data.refresh_token;
    this.scope = data.scope;
    this.created_at = data.created_at;
    this.validate_date = data.validate_date;
    this.validate_refresh_date = data.validate_refresh_date;
  }
  get userId() {
    return this.user_id;
  }
  set userId(data) {
    this.user_id = data;
  }
  get refreshToken() {
    return this.refresh_token;
  }
  set refreshToken(data) {
    this.refresh_token = data;
  }
  get validateDate() {
    return this.validate_date;
  }
  set validateDate(data) {
    this.validate_date = data;
  }
  get validateRefreshDate() {
    return this.validate_refresh_date;
  }
  set validateRefreshDate(data) {
    this.validate_refresh_date = data;
  }
  get createdAt() {
    return this.created_at;
  }
  set createdAt(data) {
    this.created_at = data;
  }
}

module.exports = AccessToken;