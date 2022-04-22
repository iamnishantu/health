
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diseaseSchema = new Schema(
  {
    diseaseimage: {
      type: String,
    },
    diseasename: {
        type: String,
      },
  },

  {
    timestamps: true,
  }
);

var Disease = mongoose.model("disease", diseaseSchema);
module.exports = Disease;
