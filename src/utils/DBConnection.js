class DBConnection {
  constructor(mysql, config) {
    this.mysql = mysql;
    this.config = config;
  }

  async connect() {
    this.connection = await this.mysql.createConnection(this.config);
  }

  async execute(sql, params) {
    const result = await this.connection.execute(sql, params);
    return result;
  }

  async query(sql, arr) {
    const result = await this.connection.query(sql, [arr]);
    return result;
  }

  async beginTransaction() {
    await this.connection.beginTransaction();
  }

  async rollback() {
    await this.connection.rollback();
  }

  async commit() {
    await this.connection.commit();
  }

  end() {
    this.connection.end();
    this.connection = null;
  }
}

module.exports = DBConnection;
