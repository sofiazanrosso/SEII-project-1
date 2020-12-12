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

// ------------- flyers testing -------------

// contains the resource
describe('-- flyers API --', () => {

    // test the GET route
    describe("-- GET /routes/flyers --", () => {
        /* FALLISCE PER TIMEOUT
        it("it should GET all the flyers", (done) => {

            chai.request(app)
                .get("/flyers")
                .end((err, res) => {
                    res.should.have.status(200);
                    done(err);
                });

        }).timeout(10000);
        */
        
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

    // test the GET (by id) route
    describe("GET(id) /routes/flyers/:id", () => {
        /* FALLISCE PER TIMEOUT
        it("it should NOT GET a flyer by ID", (done) => {

            const id = '5fbda2a6201256080d79ee3f';                          // invalid _id
            chai.request(app)
                .get("/flyers/" + id)
                .end((err, response) => {
                    response.should.have.status(404);
                    done(err);
                });

        });
        */

        /*  FALLISCE PER TIMEOUT
	    it("it should GET a flyer by ID", (done) => {

            const id = '5fcf414d27b61d4660d6610b';
            chai.request(app)
                .get("/flyers/" + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('flyer').that.include.all.keys(['_id','author']);                   
                    done(err);
                });            
        }).timeout(30000);
        */
        
    });

    // ------------------------------------------------------------

    // test the POST route
    /*describe("-- POST /routes/flyers --", () => {
        
        it("it should POST a flyer", (done) => {
            const fly = {
                title: "Testing",
                author: "Name Surname",
                category: "5fbbf5b0795ed2391cb7197f",
                // image: file
                publish_date: "03/01/01",
                expiry_date: "03/02/01"
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
    */

    // ------------------------------------------------------------

    // test the DELETE route
    describe("DELETE /flyers/:id", () => {

        it("it should NOT DELETE an existing flyer", (done) => {

            const id = 1;                          // invalid _id
            chai.request(app)
                .del("/flyers/" + id)
                .end((err, response) => {
                    response.should.have.status(500);
                    done(err);
                });

        });


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