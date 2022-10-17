const mongoose = require("mongoose");
require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const bikes = require("../controller/bike.controller");

const bike = {
  idBike: "11322",
  color: "amarillo",
  model: "asd",
  longitud: "616151",
  latitud: "51561",
  state: "alquilado",
};

const bikeRespons = [
  {
    idBike: 11322,
    color: "amarillo",
    model: "asd",
    longitud: 616151,
    latitud: 51561,
    state: "alquilado",
  },
];

describe("test add function", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGOBD);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/bike", () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get("/api/bike").send();
    });

    it("La ruta funciona", async () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("La petición nos devuelve un array de bikes", async () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  it("the data is peanut butter", () => {
    const req = {};

    const res = {
      bike,
      send: function (input) {
        this.bike = input;
      },
    };

    
    bikes.findAll(req, res)

    console.log(res.bike);

    expect(res.bike).toBeInstanceOf(Object);
  });
});
