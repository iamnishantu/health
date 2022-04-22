const multer = require("multer");
var path=require("path")
var url="https://project-2-monis.herokuapp.com"
var diseaseimage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/Image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var diseaseimage = multer({ storage: diseaseimage });
let router = require("express").Router();
var Controller = require("../controllers/diseaseController");

// BANNER ROUTES

router.route("/diseaseadd").post(diseaseimage.single("diseaseimage"), Controller.diseaseadd);
router.route("/getdisease").get(Controller.view);
router.route("/updatedisease/:id").put(diseaseimage.single("diseaseimage"), Controller.updatedisease);
router.route("/deletedisease/:id").delete(Controller.deletedisease);

module.exports = router;
