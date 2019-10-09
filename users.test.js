const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const User = require('./models/user');
const app = require('./server');


const defaultUser = {
  name: 'John Smith',
  email: 'john@example.com',
  password: '123456'
};

const newUser = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  password: '123456'
};

// describe('POST /api/users', () => {
//   it('registers a new user', () => {
//     const newUser = new User({
//       name: 'John Smith',
//       email: 'john@example.com',
//       password: '123456'
//     });

//     chai
//       .request(app)
//       .post('/api/users')
//       .then(function (err, res) {
//         expect(!newUser.isNew);
//         expect(res).to.have.param('token');
//         done();
//       });
//   });
// });


describe('POST /api/users', () => {
  beforeEach(done => {
    User.findOneAndRemove({ email: defaultUser.email }).then(done());
  });

  it('should register new user', done => {
    chai
      .request(app)
      .post('/api/users')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
      })
      .catch(err => {
        throw err;
      });
  });
});

describe('POST /api/auth', () => {
  beforeEach(async () => {
    const user = User.findOne({ email: newUser.email });
    if (!user) {
      const user = new User(newUser)
      await user.save();
    }
  })

  const loginInfo = {
    email: newUser.email,
    password: newUser.password
  };


  it('should retrieve the token', async () => {
    chai
      .request(app)
      .post('/api/auth')
      .send(loginInfo)
      .end((err, res) => {
        console.log(res);
        res.should.have.status(200);
        res.body.should.have.property('token');
      })
      .catch(err => {
        throw err;
      });
  });
});
