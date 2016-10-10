var Bookshelf = require('../../config/bookshelf');

var Task = Bookshelf.Model.extend({
    tableName: 'tasks',
    hasTimestamps: ['dateCreated', 'dateUpdated'],
});

module.exports = Task;