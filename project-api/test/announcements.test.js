const common = require('./common');
const app = common.app;
//
const express = require('express');
const chaiHttp= require("chai-http");
const chai = require("chai");
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

        }).timeout(10000);


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

            const id = '5fd862562333fd2c085b1c41';
            chai.request(app)
                .get("/announcements/" + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('announcement').that.include.all.keys(['_id','title']);                    
                    done(err);
                });

        }).timeout(10000);
        
    });

    // ------------------------------------------------------------
    
    // test the POST route
    describe("-- POST /routes/announcements --", () => {
        it("it should POST an announcement", (done) => {
            
            const ann = {
                title: "Testing",
                author: "4e616d65205375726e616d65",
                category: "5fd863fc53de740c6883433f",
                content: "Content",
                publish_date: "2020-12-14",
                expiry_date: "2020-12-16"
            };

            chai.request(app)
                .post("/announcements")
                .send(ann)
                .end((err, response) => {
                    response.should.have.status(201);                
                    done(err);
                });

        }).timeout(10000);

    });
    

    // ------------------------------------------------------------

    // test the DELETE route
    describe("DELETE /announcements/:id", () => {

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