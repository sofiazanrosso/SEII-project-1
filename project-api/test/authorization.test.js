// Common
const common = require('./common');
// Dependencies
const app = common.app;
const mongoose = common.mongoose;
const chai = common.chai;
const chaiHttp = common.chaiHttp;
//
const bcrypt = require('bcryptjs');
const User = require('../api/models/user');

// chai
const expect = chai.expect;
const { mongo } = require('mongoose');


describe('Auth', function () {

    describe('Login', function () {

        beforeEach(async function () {
            await User.deleteMany({});
        });


        it('should not login if body request is bad formatted', function (done) {
            chai.request(app)
                .post('/auth/login')
                .send({
                    'email': 'user@example.com'
                }).end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.equal('"password" is required');
                    done();
                });
        });


        it('should not login if body request is bad formatted', function (done) {
            chai.request(app)
                .post('/auth/login')
                .send({
                    'password': 'hashed password'
                }).end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.equal('"email" is required');
                    done();
                });
        });


        it('should not login with invalid password', function (done) {
            // Hash password
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync('password', salt);
            // User
            const user = {
                'email': 'user@example.com',
                'password': hashPassword,
                'displayName': 'User Name'
            };
            // Save user to DB
            (new User(user)).save().then(() => {
                //
                chai.request(app)
                    .post('/auth/login')
                    .send({
                        'email': 'user@example.com',
                        'password': 'forgot it'
                    }).end(function (err, res) {
                        expect(res).to.have.status(401);
                        expect(res.body.error).to.equal('Invalid password');
                        done();
                    });
            });
        });


        it('should login a valid user', function (done) {
            // Hash password
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync('password', salt);
            // User
            const user = {
                'email': 'user@example.com',
                'password': hashPassword,
                'displayName': 'User Name'
            };
            // Save user to DB
            (new User(user)).save().then(() => {
                //
                chai.request(app)
                    .post('/auth/login')
                    .send({
                        'email': 'user@example.com',
                        'password': 'password'
                    }).end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body.accessToken).to.exist;
                        expect(res.body.user.email).to.equal(user.email);
                        expect(res.body.user.displayName).to.equal(user.displayName);
                        done();
                    });
            });
        });

    });

});
