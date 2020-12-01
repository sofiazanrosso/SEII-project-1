const express = require('express');
const chaiHttp= require("chai-http");
const chai = require("chai");
const app = require('../../app');
const Announcement= require('../api/models/announcement');
const mocha = require("mocha");
const { response } = require('../../app');

// assertion style
chai.should();

// allows chai to do http request
chai.use(chaiHttp);

// contains the resource
describe('-- flyers API --', () => {

    // test the GET route
    describe("-- GET /routes/flyers --", () => {
        it("it should GET all the flyers", (done) => {
            chai.request(app)
            .get("/flyers")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

    

    // test the POST route
    describe("-- POST /routes/flyers --", () => {
        it("it should POST a flyer", (done) => {
            const ann = {
                title: "Testing",
                author: "Name Surname",
                category: "5fbbf5b0795ed2391cb7197f",
                content: "Content",
                publishDate: "03/01/01",
                expiryDate: "03/02/01"
            };
            chai.request(app)
            .post("/flyers")
            .send(ann)
            .end((err, response) => {
                response.should.have.status(201);                
                done();
            });
        });
    });

    

});