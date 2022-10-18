const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
require("dotenv").config();



describe("Test the root path", () => {

  afterEach(async () => {
    await mongoose.connection.close();
  });
  
  it("It should response the GET method",async () => {
    const res= await request(app)
      .post("/")
      .type('json')
      .send({ color: 'blue' });
    expect(res.statusCode).toBe(405);
  });
});
