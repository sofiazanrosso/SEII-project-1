// NODE_ENV set to test
process.env.NODE_ENV = 'test';

// app
module.exports.app = require('../../app');
// mongoose
module.exports.mongoose = require('mongoose');
// chai
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
module.exports.chai = chai;



// module.exports.request = require('supertest').agent(app.listen());