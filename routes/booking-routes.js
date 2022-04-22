let router = require("express").Router();
const Controller=require("../controllers/bookingController")
const auth=require("../middleware/auth")

// CATEGORY ROUTE

router.route("/addbooking").post(auth.userloggedIn,Controller.addbooking)
router.route("/getbooking").get(auth.userloggedIn,Controller.getbooking)
router.route("/updatebooking").put(auth.userloggedIn,Controller.updatebooking)
router.route("/deletebooking").delete(auth.userloggedIn,Controller.deletebooking)
router.route("/allbooking").get(auth.adminloggedIn,Controller.allbooking)

module.exports = router;
