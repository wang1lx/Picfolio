const assert = require('assert');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../testServer');
const should = chai.should();

chai.use(chaiHttp);


describe('POST /api/users', () => {

  const defaultUser = {
    name: 'John Smith',
    email: 'john@example.com',
    password: '123456'
  };

  it('should create a user', function(done) {
    chai
      .request(server)
      .post('/api/users')
      .send(defaultUser)
      .end((err, res) => {
        // res.should.have.status(200);
        res.body.should.have.property('token');
        done();
      })
  })
})
