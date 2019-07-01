const Repo = require('../Repo');
const TodoItem = require('./TodoItem');

class ToDoRepo extends Repo {
  constructor(db) {
    super(db, 'todo_items');
  }

  hydrate(data) {
    return new TodoItem(data);
  }
}

module.exports = ToDoRepo;