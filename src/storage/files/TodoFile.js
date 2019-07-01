class TodoFile {
  constructor(data) {
    this.id = data.id;
    this.item_id = data.item_id;
    this.bucket = data.bucket;
    this.region = data.region;
    this.file_name = data.file_name;
    this.path_origin = data.path_origin;
    this.path_minimize = data.path_minimize;
    this.created_at = data.created_at;
  }
  get itemId() {
    return this.item_id;
  }
  set itemId(data) {
    this.item_id = data;
  }
  get fileName() {
    return this.file_name;
  }
  set fileName(data) {
    this.file_name = data;
  }
  get pathOrigin() {
    return this.path_origin;
  }
  set pathOrigin(data) {
    this.path_origin = data;
  }
  get pathMinimize() {
    return this.path_minimize;
  }
  set pathMinimize(data) {
    this.path_minimize = data;
  }
  get createdAt() {
    return this.created_at;
  }
  set createdAt(data) {
    this.created_at = data;
  }
}

module.exports = TodoFile;