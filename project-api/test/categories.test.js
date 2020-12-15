const express = require('express');
const chaiHttp= require("chai-http");
const chai = require("chai");
const app = require('../../app');
const Category= require('../api/models/category');
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


// ------------- categories testing ------------- 


// contains the resource
describe('-- categories API --', () => {

    // test the GET route
    describe("-- GET /routes/categories --", () => {
        it("it should GET all the categories", (done) => {

            chai.request(app)
                .get("/categories")
                .end((err, res) => {
                    res.should.have.status(200);
                    done(err);
                });

        });


        it("it should NOT GET all the categories", (done) => {

            chai.request(app)
                .get("/cathegories")
                .end((err, res) => {
                    res.should.have.status(404);
                    done(err);
                });

        });
        
    });

    // ------------------------------------------------------------

    // test the GET (by id) route
    describe("GET(id) /routes/categories/:id", () => {
        
	    it("it should GET a category by ID and return announcements and flyers", (done) => {

            const id = '5fbbf40c795ed2391cb71979';
            chai.request(app)
                .get("/categories/" + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('announcement');                    
                    done(err);
                });

        }).timeout(10000);
        
    });
    

    // ------------------------------------------------------------
    //  FUNZIONA, MA DISTURBA IL DATABASE
    // test the POST route
    describe("-- POST /routes/categories --", () => {
        it("it should POST a category", (done) => {
            
            const cat = {
                name : "Test Category"
            };

            chai.request(app)
                .post("/categories")
                .send(cat)
                .end((err, response) => {
                    response.should.have.status(201);                
                    done(err);
                });

        }).timeout(10000);

    });
    
    // ------------------------------------------------------------

    // test the DELETE route
    describe("DELETE /categories/:id", () => {

        it("it should DELETE an existing category", (done) => {

            const id = '5fbbf402795ed2391cb71978';
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