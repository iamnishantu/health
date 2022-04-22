let router = require("express").Router();
const Controller = require("../controllers/ratingreviewController");
const auth=require("../middleware/auth")

// ROUTE FOR Report

router.route("/addrating").post(auth.userloggedIn,Controller.addrating);
router.route("/getrating").get(auth.userloggedIn,Controller.view);


module.exports = router;
