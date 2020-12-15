const app = require('./common').app;
//
const express = require('express');
const chaiHttp= require("chai-http");
const chai = require("chai");
const Announcement= require('../api/models/announcement');
const mocha = require("mocha");
const { response } = require('../../app');

// assertion style
chai.should();

// allows chai to do http request
chai.use(chaiHttp);

// ------------- flyers testing -------------

//

// contains the resource
describe('-- flyers API --', () => {

    // test the GET route
    describe("-- GET /routes/flyers --", () => {

        it("it should GET all the flyers", (done) => {

            chai.request(app)
                .get("/flyers")
                .end((err, res) => {
                    res.should.have.status(200);
                    done(err);
                });

        }).timeout(10000);
        
        
        it("it should NOT GET all the flyers", (done) => {

            chai.request(app)
                .get("/flyer")
                .end((err, res) => {
                    res.should.have.status(404);
                    done(err);
                });

        });

    });

    // ------------------------------------------------------------

    // test the POST route
    describe("-- POST /routes/flyers --", () => {
        
        it("it should POST a flyer", (done) => {
            const fly = {
                title: "Testing",
                author: "4e616d65205375726e616d65",
                category: "5fd863fc53de740c6883433f",
                publishDate: "2020-12-15",
                expiryDate: "2020-12-20"
            };
            chai.request(app)
            .post("/flyers")
            .send(fly)
            .end((err, response) => {
                response.should.have.status(201);                
                done(err);
            });
        });

    });
    

    // ------------------------------------------------------------

    // test the DELETE route
    describe("DELETE /flyers/:id", () => {

        it("it should DELETE an existing flyer", (done) => {

            const id = '5fbe5963ddf1d226acb838e9';
            chai.request(app)
                .del("/flyers/" + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    done(err);
                });

        });

    });
    
    // ------------------------------------------------------------

});