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
  let saveStub;
  let findStub;
  beforeEach(function () {
    saveStub = sinon.stub(Bike.prototype, "save").yieldsTo("success", {});
    findStub = sinon.stub(Bike, "find").returns(
      Promise.resolve([
        {
          _id: "634f15a5a7ea9bdc81d3ac38",
          idBike: 23400,
          color: "blue",
          model: "34",
          __v: 0,
        },
      ])
    );
  });

  afterEach(function () {
    saveStub.restore();
    findStub.restore();
  });

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
        res.should.have.status(500);//intentional failure
        res.should.have.status(405);
        res.body.should.be.a("object");
        done();
      });
  });

  it("find should return the bike that has the specific id  ", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        console.log("get23432" + JSON.stringify(res));
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.should.have.lengthOf(1)
        done();
      });
  });
});
