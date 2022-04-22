const multer = require("multer");
var path=require("path")
var url="https://project-2-monis.herokuapp.com"
var packageimage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/Image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var packageimage = multer({ storage: packageimage });


let router = require("express").Router();
var Controller = require("../controllers/toppackageController");

// BANNER ROUTES

router.route("/toppackageadd").post(packageimage.single("packageimage"), Controller.toppackageadd);
router.route("/getpackage").get(Controller.view);
router.route("/updatedpackage/:id").put(packageimage.single("packageimage"), Controller.updatedpackage);
router.route("/deletedpackage/:id").delete(Controller.deletedpackage);

module.exports = router;
