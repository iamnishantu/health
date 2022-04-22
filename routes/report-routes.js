let router = require("express").Router();
const Controller = require("../controllers/reportController");
const auth=require("../middleware/auth")

// MULTER USE FOR IMAGE

const multer = require("multer");
var path=require("path")
var addreport = multer.diskStorage({
    destination: function (req, file, cb) {cb(null, "./upload/Image")},
    filename: function (req, file, cb) {cb(null, Date.now() + path.extname(file.originalname))},
});
var addreport = multer({ storage: addreport });

// ROUTE FOR Report

router.route("/addreport").post(auth.adminloggedIn,addreport.single("image"),Controller.addreport);
router.route("/getReport").get(auth.userloggedIn,Controller.view);


module.exports = router;
