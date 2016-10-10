var express = require('express'),
bodyParser = require('body-parser'),
jsendie = require('jsendie'),
path = require('path'),
app = express(),
Task = require('./app/models/task'),
PORT = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(jsendie());

// single page todo app
app.get('/', function(req, res, next){
    res.render('index');
});

// create task
app.post('/task', function(req, res, next){
    var b = req.body;
    Task.forge({
        title: b.title,
        completed: b.completed
    }).save().then(function (task) {
        res.success(task);
    }).catch(function (err) {
        console.error('Error saving record');
        console.error(err);
        res.error(err);
    });
});

// retrieve all tasks 
app.get('/task', function(req, res, next){
    Task.fetchAll().then(function(tasks){
        res.success(tasks);
    }).catch(function (err) {
        console.error('Error retrieve record');
        console.error(err);
        res.error(err);
    });
});

// update task
app.put('/task/:id', function(req, res, next){
    var p = req.params;
    var b = req.body;
    Task.forge({
        id: p.id
    }).fetch().then(function(task){
        return task.save({
            title: b.title,
            completed: b.completed
        });
    }).then(function(saved){
        res.success(saved);
    }).catch(function (err){
        console.error('Error update record');
        console.error(err);
        res.error(err);
    });
});

// delete task
app.delete('/task/:id', function(req, res, next){
    var p = req.params;
    Task.forge({
        id: p.id
    }).fetch().then(function(task){
        return task.destroy();
    }).then(function(){
        res.success('Task deleted');
    }).catch(function(err){
        console.error('Error delete record');
        console.error(err);
        res.error(err);
    });
});

app.listen(PORT, function(){
    console.log('Server listen to port: ' + PORT);
});

module.exports = app;