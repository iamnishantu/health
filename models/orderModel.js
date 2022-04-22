const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booking",
    },
    payment_status: {
      type: String,
      enum: ["paid", "failed", "pending"],
      default: "pending"
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "package"
    },
    price: {
        type: Number
    },
    discount: {
        type: Number
    },
    razorpay_order_id: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", OrderSchema);
module.exports = Order