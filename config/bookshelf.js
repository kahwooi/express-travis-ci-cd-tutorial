var path = require('path');

var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, '../db/todo.db')
    },
    useNullAsDefault: true
});
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;