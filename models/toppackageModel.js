
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema(
  {
    packageimage: {
      type: String,
    },
    packagename: {
        type: String,
      },
  },

  {
    timestamps: true,
  }
);

var Toppackage = mongoose.model("toppackage", packageSchema);
module.exports = Toppackage;
