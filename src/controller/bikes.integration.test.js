process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../bin/www");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Books", () => {
  /*
   * Test the /GET route
   */
  describe("/GET Bikes", () => {
    it("it should GET all the Bikes", (done) => {
      try {
        chai
          .request(server)
          .get("/")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      } catch (error) {
        console.log("error on test get all" + error);
        done(new Error("Test failed to start"));
      }
    });

    it("it should not Create a bike without id ", (done) => {
      let bike = {
        color: "blue",
        model: "34",
      };
      try {
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
      } catch (error) {
        console.log("error on test get all" + error);
        done(new Error("Test failed to start"));
      }
    });
  });
});
