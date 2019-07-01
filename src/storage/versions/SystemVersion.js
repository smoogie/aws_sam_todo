class SystemVersion {
  constructor(data) {
    this.id = data.id;
    this.weight = data.weight;
    this.system = data.system;
    this.version = data.version;
    this.is_min = data.is_min;
    this.created_at = data.created_at;
  }
  get isMin() {
    return this.is_min;
  }
  set isMin(data){
    this.is_min = data;
  }
  get createdAt() {
    return this.created_at;
  }
  set createdAt(data) {
    this.created_at = data;
  }
}

module.exports = SystemVersion;