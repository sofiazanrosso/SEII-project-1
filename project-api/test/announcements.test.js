const express = require('express');
const chaiHttp= require("chai-http");
const chai = require("chai");
const app = require('../../app');
const Announcement= require('../api/models/announcement');
const mocha = require("mocha");
const { response } = require('../../app');
//const { response } = require('../app');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const should = require('should');

// assertion style
chai.should();

// allows chai to do http request
chai.use(chaiHttp);


// ------------- announcements testing ------------- 


// contains the resource
describe('-- announcements API --', () => {

    // test the GET route
    describe("-- GET /routes/announcements --", () => {
        it("it should GET all the announcements", (done) => {

            chai.request(app)
                .get("/announcements")
                .end((err, res) => {
                    res.should.have.status(200);
                    done(err);
                });

        });


        it("it should NOT GET all the announcements", (done) => {

            chai.request(app)
                .get("/announements")
                .end((err, res) => {
                    res.should.have.status(404);
                    done(err);
                });

        });
        
    });

    // ------------------------------------------------------------

    // test the GET (by id) route
    describe("GET(id) /routes/announcements/:id", () => {
        
        it("it should NOT GET an announcement by ID", (done) => {

            const id = '5fbda2a6201256080d79ee3f';                          // invalid _id
            chai.request(app)
                .get("/announcements/" + id)
                .end((err, response) => {
                    response.should.have.status(404);
                    done(err);
                });

        });


	    it("it should GET an announcement by ID", (done) => {

            const id = '5fbda2a6201256080d79f10a';
            chai.request(app)
                .get("/announcements/" + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('announcement').that.include.all.keys(['_id','author']);                    
                    done(err);
                });

        }).timeout(5000);
        
    });

    // ------------------------------------------------------------

    // test the POST route
    describe("-- POST /routes/announcements --", () => {
        it("it should POST an announcement", (done) => {
            
            const ann = {
                title: "Testing",
                author: "Name Surname",
                category: "5fbbf5b0795ed2391cb7197f",
                content: "Content",
                publishDate: "03/01/01",
                expiryDate: "03/02/01"
            };

            chai.request(app)
                .post("/announcements")
                .send(ann)
                .end((err, response) => {
                    response.should.have.status(201);                
                    done(err);
                });

        }).timeout(5000);

    });

    // ------------------------------------------------------------

    // test the DELETE route
    describe("DELETE /announcementes/:id", () => {

        it("it should NOT DELETE an existing announcement", (done) => {

            const annid = 1;                          // invalid _id
            chai.request(app)
                .del("/announcements/" + annid)
                .end((err, response) => {
                    response.should.have.status(500);
                    done(err);
                });

        });


        it("it should DELETE an existing announcement", (done) => {

            const id = '5fbe361364aca743044da920';
            chai.request(app)
                .del("/announcements/" + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    done(err);
                });

        });
    });
    
    // ------------------------------------------------------------

});