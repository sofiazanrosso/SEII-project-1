const app = require('./common').app;
// const app = require('../../app');
const chaiHttp= require("chai-http");
const chai = require("chai");
const User = require('../api/models/user');
// assertion style
chai.should();

// allows chai to do http request
chai.use(chaiHttp);

describe('auth API', () => {
    describe("Register",()=>{
        before(async function(){
            await User.deleteMany({});
        });

        it("it should register an user",function (done){
            const user={
                email: "test@gmail.com",
                password: "password",
                displayName: "whoami"
            };
            chai.request(app)   
            .post("/auth/register")
            .send(user)
            .end((err,response)=>{
                response.should.have.status(201);
                done();
            });
        });

        it("it should NOT register an user with an email already taken",function (done){
            const user={
                email: "test@gmail.com",
                password: "password",
                displayName: "whoami"
            };
            chai.request(app)   
            .post("/auth/register")
            .send(user)
            .end((err,response)=>{
                response.should.have.status(400);
                done();
            });
        });

        it("it should NOT register an user without the password",function (done){
            const user={
                email: "test2@gmail.com",
                displayName: "whoami"
            };
            chai.request(app)   
            .post("/auth/register")
            .send(user)
            .end((err,response)=>{
                response.should.have.status(400);
                done();
            });
        });
        
        it("it should NOT register an user with an invalid email",function (done){
            const user={
                email: "thisisnotanemail",
                password: "password",
                displayName: "whoami"
            };
            chai.request(app)   
            .post("/auth/register")
            .send(user)
            .end((err,response)=>{
                response.should.have.status(400);
                done();
            });
        });
        
    });
});