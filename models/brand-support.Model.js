const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandsupportSchema = new Schema(
  {
    brandAdd: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

var Brand = mongoose.model("brand", brandsupportSchema);
module.exports = Brand;
