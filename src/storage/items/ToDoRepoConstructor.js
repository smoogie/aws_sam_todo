const db = require('../../Utils/Constructors/DBConnectionConstructor');
const ToDoRepo = require('./ToDoRepo');

module.exports = new ToDoRepo(db);