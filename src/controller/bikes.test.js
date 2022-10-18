const db = require("../models");
const Bike = db.bike;

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../app");
let should = chai.should();
var sinon = require("sinon");

chai.use(chaiHttp);
//Our parent block

describe("/GET Bikes", () => {
    sinon.stub(Bike.prototype,'save')
    .yieldsTo('success',{})


  it("it should not Create a bike without id ", (done) => {
    let bike = {
      color: "blue",
      model: "34",
    };
    chai
      .request(server)
      .post("/")
      .send(bike)
      .end((err, res) => {
        console.log(JSON.stringify(res));
        res.should.have.status(405);
        res.body.should.be.a("object");
        done();
      });
  });
});
