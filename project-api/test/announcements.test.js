const express = require('express');
const chaiHttp= require("chai-http");
const chai = require("chai");
const app = require('../app');
const Announcement= require('../api/models/announcement');
const mocha = require("mocha");
const { response } = require('../app');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const should = require('should');

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

    // test the GET (by id) route
    describe("GET(id) /routes/announcements/:id", () => {
        
        
        it("it should NOT GET a task by ID", (done) => {
            const _id = 1;
            chai.request(app)
            .get("/announcements/" + _id)
            .end((err, response) => {
                response.should.have.status(500);
                done();
            });
        });

	    it("it should GET a task by ID", (done) => {
            // announcement created properly for testing

            // var id = mongoose.Schema.Types.ObjectId('5fbda2a6201256080d79f10a');
            // const id = 1;
            const id = parseInt('5fbda2a6201256080d79f10a', 16);
            chai.request(app)
                .get("api/routes/announcements/" + id)
                .end((err, response) => {
                    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + err + response);

                    should.exist(response.body);
                    response.body.should.have.property('_id');
                    response.should.have.status(200);
                    // expect(200);
                    // response.body.should.be.a('object');
                    
                    // should(response.body).have.property('_id');
                    // response.body.should.have.property('title');
                    // response.body.should.have.property('author');
                    // response.body.should.have.property('category');
                    // response.body.should.have.property('content');
                    // response.body.should.have.property('publish_date');
                    // response.body.should.have.property('expiry_date');
                    // response.body.should.have.property('_id').eq('5fbda2a6201256080d79f10a');
                    response.body.should.have.property('_id').eq(parseInt('5fbda2a6201256080d79f10a', 16));
                    // expect(response.body).to.eql(id);
                    
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