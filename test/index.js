var server = require('supertest');
var should = require('chai').should();
var app = require('../app');

describe("todo", function() {
    var id = 0; 

    describe("create task", function(){
        it("should pass", function(done){
            server(app)
            .post('/task')
            .send({	title: "Buy Milk", completed: 0})
            .end(function(err, res){
                if(err) done(err);
                res.status.should.equal(200);
                res.body.status.should.equal("success");
                res.body.data.should.be.an("object");
                res.body.data.should.contain.keys("title", "completed");
                
                id = res.body.data.id;
                done();
            });
        });
    });

    describe("retrieve all tasks", function(){
        it("should pass", function(done){
            server(app)
            .get('/task')
            .end(function(err, res){
                if(err) done(err);
                res.status.should.equal(200);
                res.body.status.should.equal("success");
                res.body.data.should.be.an("array");
                res.body.data[0].should.contain.keys("title", "completed");

                done();
            });
        });
    });

    describe("update task", function(){
        it("should pass", function(done){
            server(app)
            .put('/task/' + id)
            .send({ title: "Buy Surface Pro", completed: 0 })
            .end(function(err, res){
                if(err) done(err);
                res.status.should.equal(200);
                res.body.status.should.equal("success");
                res.body.data.title.should.equal("Buy Surface Pro");

                done();
            });
        });
    });

    describe("delete task", function(){
        it("should pass", function(done){
            server(app)
            .delete('/task/' + id)
            .end(function(err, res){
                if(err) done(err);
                res.status.should.equal(200);
                res.body.status.should.equal("success");

                done();
            });
        });
    });
});