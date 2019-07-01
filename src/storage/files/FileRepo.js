const Repo = require('../Repo');
const TodoFile = require('./TodoFile');

class FileRepo extends Repo {
  constructor(db) {
    super(db, 'todo_files');
  }

  hydrate(data) {
    return new TodoFile(data);
  }
}

module.exports = FileRepo;