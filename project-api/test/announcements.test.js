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

// contains the resource
describe('announcements API', () => {

    // test the GET route
    describe("GET /routes/announcements", () => {
        it("it should GET all the announcements", (done) => {
            chai.request(app)
            .get("/announcements")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
        it("it should NOT GET all the announcements", (done) => {
            chai.request(app)
            .get("/announements")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
        });
    });

    

    // test the POST route
    describe("POST /routes/announcements", () => {
        it("it should POST an announcement", (done) => {
            // announcement created properly for testing
            const ann = {
                title: "Testing",
                author: "Name Surname",
                category: "5fbbf5b0795ed2391cb7197f",
                content: "Content",
                publish_date: "03/01/01",
                expiry_date: "03/02/01"
            };
            chai.request(app)
            .post("/announcements")
            .send(ann)
            .end((err, response) => {
                response.should.have.status(201);                
                done();
            });
        });
    });

    

});