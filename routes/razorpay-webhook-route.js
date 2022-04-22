const router = require("express").Router();
const razorpayWebhookController = require("../controllers/razorpayWebhookController");

router.post("/webhook/razorpay", razorpayWebhookController.razorpayWebhook);

module.exports = router;