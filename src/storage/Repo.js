class Repo {
  constructor(db, table, pk = 'id') {
    this.db = db;
    this.table = table;
    this.pk = pk;
  }

  async query(query, data) {
    await this.db.connect();
    const [rows] = await this.db.execute(query, data);
    this.db.end();
    return rows;
  }

  findOne(query, data) {
    let object = null;
    const rows = this.query(query, data);
    if (rows !== undefined && rows !== null && rows.length > 0) {
      object = this.hydrate(rows[0]);
    }
    return object;
  }

  findMany(query, data) {
    const rows = this.query(query, data);
    let objects = [];
    if (rows !== undefined && rows !== null && rows.length > 0) {
      objects = rows.map(row => this.hydrate(row))
    }
    return objects;
  }

  async deleteQuery(id) {
    try {
      const query = `DELETE FROM ${this.table} WHERE ${this.pk} = ${id}`;

      const connection = this.db.connect();
      await connection.execute(query);
      connection.end();

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async find(id) {
    const query = `SELECT * FROM ${this.table} WHERE ${this.pk} = ${id}`;
    return this.findOne(query, [])
  }

  delete(id) {
    return this.deleteQuery(id);
  }

  hydrate(data) {
    return data;
  }
}

module.exports = Repo;