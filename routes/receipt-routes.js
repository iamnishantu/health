let router = require("express").Router();
const Controller = require("../controllers/receiptController");
const auth=require("../middleware/auth")

// MULTER USE FOR IMAGE

const multer = require("multer");
var path=require("path")
var addreceipt = multer.diskStorage({
    destination: function (req, file, cb) {cb(null, "./upload/Image")},
    filename: function (req, file, cb) {cb(null, Date.now() + path.extname(file.originalname))},
});
var addreceipt = multer({ storage: addreceipt });

// ROUTE FOR Report

router.route("/addreceipt").post(auth.adminloggedIn,addreceipt.single("image"),Controller.addreceipt);
router.route("/getreceipt").get(auth.userloggedIn,Controller.view);


module.exports = router;
