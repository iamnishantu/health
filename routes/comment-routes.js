let router = require("express").Router();
const Controller = require("../controllers/commentController");
const auth=require("../middleware/auth")

// ROUTE FOR Report

router.route("/addcomment").post(auth.userloggedIn,Controller.addcomment);
router.route("/getcomment").get(auth.userloggedIn,Controller.view);


module.exports = router;
