const Repo = require('../Repo');
const TodoList = require('./TodoList');

class ToDoListRepo extends Repo {
  constructor(db) {
    super(db, 'todo_lists');
  }

  hydrate(data) {
    return new TodoList(data);
  }
}

module.exports = ToDoListRepo;