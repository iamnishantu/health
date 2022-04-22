const multer = require("multer");
var path=require("path")
var url="https://project-2-monis.herokuapp.com"
var profileimage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/Image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var profileimage = multer({ storage: profileimage });
let router = require("express").Router();
var Controller = require("../controllers/profileController");

// BANNER ROUTES

router.route("/profileadd").post(profileimage.single("profileimage"), Controller.profileadd);
router.route("/getprofile").get(Controller.view);
router.route("/updateprofile/:id").put(profileimage.single("profileimage"), Controller.updateprofile);
router.route("/deleteprofile/:id").delete(Controller.deleteprofile);

module.exports = router;
