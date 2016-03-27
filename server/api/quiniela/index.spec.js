'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var quinielaCtrlStub = {
  index: 'quinielaCtrl.index',
  show: 'quinielaCtrl.show',
  create: 'quinielaCtrl.create',
  update: 'quinielaCtrl.update',
  destroy: 'quinielaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var quinielaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './quiniela.controller': quinielaCtrlStub
});

describe('Quiniela API Router:', function() {

  it('should return an express router instance', function() {
    quinielaIndex.should.equal(routerStub);
  });

  describe('GET /api/quinielas', function() {

    it('should route to quiniela.controller.index', function() {
      routerStub.get
        .withArgs('/', 'quinielaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/quinielas/:id', function() {

    it('should route to quiniela.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'quinielaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/quinielas', function() {

    it('should route to quiniela.controller.create', function() {
      routerStub.post
        .withArgs('/', 'quinielaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/quinielas/:id', function() {

    it('should route to quiniela.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'quinielaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/quinielas/:id', function() {

    it('should route to quiniela.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'quinielaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/quinielas/:id', function() {

    it('should route to quiniela.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'quinielaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
