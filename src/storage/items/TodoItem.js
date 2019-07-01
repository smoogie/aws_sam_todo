class TodoItem {
  constructor(data) {
    this.id = data.id;
    this.list_id = data.list_id;
    this.status = data.status;
    this.priority = data.priority;
    this.title = data.title;
    this.description = data.description;
    this.created_at = data.created_at;
  }
  get listId() {
    return this.list_id;
  }
  set listId(data) {
    this.list_id = data;
  }
  get createdAt() {
    return this.created_at;
  }
  set createdAt(data) {
    this.created_at = data;
  }
}

module.exports = TodoItem;