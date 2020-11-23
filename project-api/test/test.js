const express = require('express');
const chai = require("chai");
const request = require("supertest");
const app= express();
const Announcement= require('../api/models/announcement');

describe('announcements', () => {
    it('should GET all announcements', (done) => {
        chai.request(app)
        .get("/announcements")
        .end((err, res) => {
              res.should.have.status(200);
              done();
            });
    });
});