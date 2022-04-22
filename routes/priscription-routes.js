let router = require("express").Router();
const Controller = require("../controllers/priscriptionController");
const auth=require("../middleware/auth")

// MULTER USE FOR IMAGE

const multer = require("multer");
var path=require("path")
var addpriscription = multer.diskStorage({
    destination: function (req, file, cb) {cb(null, "./upload/Image")},
    filename: function (req, file, cb) {cb(null, Date.now() + path.extname(file.originalname))},
});
var addpriscription = multer({ storage: addpriscription });

// ROUTE FOR Report

router.route("/addpriscription").post(auth.adminloggedIn,addpriscription.single("image"),Controller.addpriscription);
router.route("/getpriscription").get(auth.userloggedIn,Controller.view);


module.exports = router;
