module.exports = (mongoose) => {
  const Bike = mongoose.model(
    "bike",
    mongoose.Schema(
      {
        idBike: { type: Number, index: { unique: true, sparse: true }},
        color: { type: String, index: { unique: true, sparse: true } },
        model: { type: String, index: { unique: true, sparse: true } },
      },
      { timestamps: false }
    )
  );

  return Bike;
};
