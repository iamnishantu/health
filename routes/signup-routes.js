let router = require("express").Router();
var Controller = require("../controllers/user-Controller");
var auth=require("../middleware/auth")
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validator/userValidation');


// MULTER FOR IMAGE

const multer = require("multer");
var path=require("path")
var image = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/Image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var image = multer({ storage: image });

// Signup-Routes

router.route("/sendotp").post(Controller.sendotp);
router.route("/verifyOtp").post(Controller.verifyOtp)
router.route("/adduser").post(auth.userloggedIn,Controller.adduser)
router.route("/getuser").get(auth.userloggedIn,Controller.getuser)
router.route("/updateuser").put(auth.userloggedIn,image.single("image"),Controller.updateuser)
router.route("/deleteuser").delete(auth.userloggedIn,Controller.deleteuser)
router.route("/alluser").get(Controller.getalluser)


module.exports = router;