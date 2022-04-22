let router = require("express").Router();
const Controller = require("../controllers/brand-supprt-Controller");
// const auth=require("../middleware/auth")

// MULTER USE FOR IMAGE

const multer = require("multer");
var path=require("path")
var brandAdd = multer.diskStorage({
    destination: function (req, file, cb) {cb(null, "./upload/Image")},
    filename: function (req, file, cb) {cb(null, Date.now() + path.extname(file.originalname))},
});
var brandAdd = multer({ storage: brandAdd });

// ROUTE FOR BRAND

router.route("/brandAdd").post(brandAdd.single("image"),Controller.brandAdd);
router.route("/getBrand").get(Controller.view);
router.route("/brandUpdatebyId/:id").put(brandAdd.single("brandAdd"), Controller.updateBrand);
router.route("/branddeletebyId/:id").delete(Controller.deleteBrand);


module.exports = router;
