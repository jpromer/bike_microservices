module.exports = (mongoose) => {
  const Bike = mongoose.model(
    "bike",
    mongoose.Schema(
      {
        idBike: { type: Number, index: { unique: true, sparse: true } },
        color: { type: String },
        model: { type: String },
        longitud: { type: Number },
        latitud: { type: Number },
      },
      { timestamps: false }
    )
  );

  return Bike;
};
