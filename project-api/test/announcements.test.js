const express = require('express');
const chaiHttp= require("chai-http");
const chai = require("chai");
const app = require('../app');
const Announcement= require('../api/models/announcement');
const mocha = require("mocha");
const { response } = require('../app');

// assertion style
chai.should();

// allows chai to do http request
chai.use(chaiHttp);

//contains the resource
/*describe('announcements', () => {
    //describe the http verbs (or method)
    describe("GET request",()=>{
        //every test case has an 'it'
        it('should GET all announcements', () => {
                chai.request(app)
                .get("/announcements")
                .end((err, res) => {
                    chai.expect(res.status).equal(200);
                    });
            });
    });
    
});*/

// contains the reseource
describe('announcements API', () => {

    // test the GET route
    describe("GET /routes/announcements", () => {
        it("it should GET all the announcements", (done) => {
            chai.request(app)
            .get("/announcements")
            .end((err, response) => {
                response.should.have.status(200);
                // response.body.should.be.a('array');
                done();
            });
        });
    });

    // test the GET (by id) route
    /*describe("GET(id) /routes/announcements/:id", () => {
        it("it should GET a task by ID", (done) => {
            // announcement created properly for testing
            const annID = '5fbe361364aca743044da920';
            chai.request(app)
            .get("/announcements" + annID)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('title');
                response.body.should.have.property('author');
                response.body.should.have.property('category');
                response.body.should.have.property('content');
                response.body.should.have.property('publish_date');
                response.body.should.have.property('expiry_date');
                response.body.should.have.property('_id').eql('5fbe361364aca743044da920');
                done();
            });
        });
    });*/

    // test the POST route

    // test the DELETE route

});