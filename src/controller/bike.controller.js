const db = require("../models");
const Bike = db.bike;

exports.create = (req, res) => {
  if (!req.body.idBike) {
    res
      .status(400)
      .send({ message: "Can't add bike, idBike field is required" });
    return;
  }

  if (!req.body.color) {
    res
      .status(400)
      .send({ message: "Can't add bike, color field is required" });
    return;
  }
  if (!req.body.model) {
    res
      .status(400)
      .send({ message: "Can't add bike, model field is required" });
    return;
  }

  const bike = new Bike({
    idBike: req.body.idBike,
    color: req.body.color,
    model: req.body.model,
  });
  bike
    .save(bike)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while storing a bike",
      });
    });
};

exports.findAll = (req, res) => {
  const idBike = req.query.idBike;
  var condicion = idBike
    ? { idBike: { $regex: new RegExp(idBike), $options: "i" } }
    : {};

  Bike.find(condicion)
    .then((data) => {
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
        message:
          "Error updating bike with id" +
          idBike,
      });
    });
};
