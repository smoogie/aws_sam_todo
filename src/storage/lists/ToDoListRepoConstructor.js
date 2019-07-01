const db = require('../../Utils/Constructors/DBConnectionConstructor');
const ToDoListRepo = require('./ToDoListRepo');

module.exports = new ToDoListRepo(db);