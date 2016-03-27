'use strict';

var app = require('../..');
import request from 'supertest';

var newQuiniela;

describe('Quiniela API:', function() {

  describe('GET /api/quinielas', function() {
    var quinielas;

    beforeEach(function(done) {
      request(app)
        .get('/api/quinielas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          quinielas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      quinielas.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/quinielas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/quinielas')
        .send({
          name: 'New Quiniela',
          info: 'This is the brand new quiniela!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newQuiniela = res.body;
          done();
        });
    });

    it('should respond with the newly created quiniela', function() {
      newQuiniela.name.should.equal('New Quiniela');
      newQuiniela.info.should.equal('This is the brand new quiniela!!!');
    });

  });

  describe('GET /api/quinielas/:id', function() {
    var quiniela;

    beforeEach(function(done) {
      request(app)
        .get('/api/quinielas/' + newQuiniela._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          quiniela = res.body;
          done();
        });
    });

    afterEach(function() {
      quiniela = {};
    });

    it('should respond with the requested quiniela', function() {
      quiniela.name.should.equal('New Quiniela');
      quiniela.info.should.equal('This is the brand new quiniela!!!');
    });

  });

  describe('PUT /api/quinielas/:id', function() {
    var updatedQuiniela;

    beforeEach(function(done) {
      request(app)
        .put('/api/quinielas/' + newQuiniela._id)
        .send({
          name: 'Updated Quiniela',
          info: 'This is the updated quiniela!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedQuiniela = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQuiniela = {};
    });

    it('should respond with the updated quiniela', function() {
      updatedQuiniela.name.should.equal('Updated Quiniela');
      updatedQuiniela.info.should.equal('This is the updated quiniela!!!');
    });

  });

  describe('DELETE /api/quinielas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/quinielas/' + newQuiniela._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when quiniela does not exist', function(done) {
      request(app)
        .delete('/api/quinielas/' + newQuiniela._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
