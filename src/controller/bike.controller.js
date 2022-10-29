const db = require("../models");
const Bike = db.bike;

exports.create = (req, res) => {
  console.log(req.body);

  const bike = new Bike({
    idBike: req.body.idBike,
    color: req.body.color,
    model: req.body.model,
    longitud: req.body.longitud,
    latitud: req.body.latitud,
    state: req.body.state,
  });
  bike
    .save(bike)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("An error occurred while storing a bike");
      res.status(405).send({
        message: `operation not permited the bike already exist`,
      })
    });
};

exports.findAll = (req, res) => {
  console.log("hi here"+req.query.idBike)
  const idBike = req.query.idBike;
  var condicion = idBike
    ? { idBike: { $regex: new RegExp(idBike), $options: "i" } }
    : {};

  Bike.find(condicion)
    .then((data) => {
      console.log("find "+JSON.stringify(data))
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred when searching for bikes",
      });
    });
};

exports.findOne = (req, res) => {
  const idBike = req.params.idBike;

  Bike.find({ idBike: idBike })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "There is no bike with the id" + idBike });
      } else res.send(data);
    })
    .catch((err) => {
     
      res.status(500).send({
        message: "Error bringing the bike =" + idBike,
      });
    });
};

exports.deleteOne = (req, res) => {
  const idBike = req.params.idBike;

  Bike.deleteOne({ idBike: idBike })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Failed to remove bike ${idBike}. The student may not have been found.`,
        });
      } else {
        res.send({
          message: "The bike was successfully removed",
        });
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: "Error deleting bikes",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data could not be updated!",
    });
  }

  Bike.updateOne(    
    { idBike: req.params.idBike },
    { $set: req.body },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Failed to update bike with document number =${idBike}. Please check and perform the action again!`,
        });
      } else res.send({ message: "Successfully upgraded bike" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating bike with id" + idBike,
      });
    });
};

exports.updateState = (req, res) => {
  const body = {state: req.state}
  Bike.updateOne(
    { idBike: req.idBike },
    { $set: body },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        console.log("No se actualizo el bike");
      } else {
        console.log("Bicicleta actualizada");
      }
    })
    .catch((err) => {
      console.log("Error updating bike with id");
    });
};
