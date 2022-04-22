// const Order = require("../Models/Order");
// const EnrolledCourses = require("../Models/EnrolledCourses");
const crypto = require("crypto");
// const Cart = require("../Models/Cart");
const Order = require("../models/orderModel");
const Booking = require("../models/bookingModel")
console.log(process.env.RAZORPAY_KEY_ID);
console.log(process.env.RAZORPAY_KEY_SECRET);

exports.razorpayWebhook = async (req, res) => {
  try {
    console.log("webhook");
    console.log(req.body.event);
    const webhookPayloadJson = JSON.stringify(req.body);
    const receivedRazorpaySignature = req.headers["x-razorpay-signature"];
    console.log(req.headers);

    const calculatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(webhookPayloadJson)
      .digest("hex");

    if (receivedRazorpaySignature !== calculatedSignature) {
      console.log("hmac signature does not matches");
      console.log(receivedRazorpaySignature);
      console.log(calculatedSignature);
      return res.sendStatus(400);
    }

    const webhookPayload = req.body;

    switch (webhookPayload.event) {
      case "order.paid":
        await updateOrderStatus(webhookPayload.payload.order.entity.id, "paid");
        break;
      case "payment.failed":
        await updateOrderStatus(
          webhookPayload.payload.payment.entity.order_id,
          "failed"
        );
        break;
      default:
        break;
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateOrderStatus = async (razorpayOrderId, status) => {
  try {
    const order = await Order.findOne({ razorpay_order_id: razorpayOrderId });
    order.payment_status = status;
    await order.save();

    if (status == "paid") {
      await activateBooking(order.booking)
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const activateBooking = async (bookingId) => {
    try {
        await Booking.findByIdAndUpdate(bookingId, {active: true})
    } catch (error) {
        console.log(error)
    }
}