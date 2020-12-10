const chaiHttp= require("chai-http");
const chai = require("chai");
const app = require('../../app');

// assertion style
chai.should();

// allows chai to do http request
chai.use(chaiHttp);

// contains the resource
describe('auth API', () => {

    describe("POST /routes/auth", ()=>{
        it("it should NOT register an user (user already taken)",(done)=>{
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
        }).timeout(5000);

        it("it should login an user (the user already exist)",(done)=>{
            const user={
                email: "test@gmail.com",
                password: "password"
            };
            chai.request(app)   
            .post("/auth/login")
            .send(user)
            .end((err,response)=>{
                response.should.have.status(200);
                done();
            });
        }).timeout(5000);

        it("it should NOT login an user (the user doesn't exist)",(done)=>{
            const user={
                email: "test@nogmail.com",
                password: "password"
            };
            chai.request(app)   
            .post("/auth/login")
            .send(user)
            .end((err,response)=>{
                response.should.have.status(400);
                done();
            });
        }).timeout(5000);
    });

});