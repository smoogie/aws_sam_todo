const Repo = require('../Repo');
const SystemVersion = require('./SystemVersion');

class VersionRepo extends Repo {
  constructor(db) {
    super(db, 'system_versions');
  }

  async systemExists(system) {
    try {
      const query = 'SELECT * FROM system_versionsWHERE system = ?';
      const data = [system];

      await this.db.connect();
      const [rows] = await this.db.execute(query, data);
      this.db.end();

      const systemExists = (rows !== undefined && rows !== null && rows.length > 0);
      return systemExists;
    } catch (error) {
      throw error;
    }
  }

  async find(system, version) {
      const query = 'SELECT * FROM system_versions WHERE system = ? AND version = ?';
      const data = [system, version];
      const systemVersion = this.findOne(query, data);
      return systemVersion;
  }

  async getMinVersion(system) {
    const query = 'SELECT * FROM system_versions WHERE system = ? AND is_min = 1';
    const data = [system];
    const systemVersion = this.findOne(query, data);
    return systemVersion;
  }

  hydrate(data) {
    return new SystemVersion(data);
  }
}

module.exports = VersionRepo;