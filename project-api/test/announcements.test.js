const express = require('express');
const chaiHttp= require("chai-http");
const chai = require("chai");
const app = require('../app');
const Announcement= require('../api/models/announcement');
const mocha = require("mocha");

//allows chai to do http request
chai.use(chaiHttp);

//contains the resource
describe('announcements', () => {
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
    
});