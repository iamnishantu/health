let router = require("express").Router();
const Controller=require("../controllers/packageController")
const auth=require("../middleware/auth")

// CATEGORY ROUTE

router.route("/addpackage").post(Controller.addpackage)
router.route("/getpackage/:id").get(Controller.getpackage)
router.route("/getallpackage").get(Controller.getallpackage)
// router.route("/updatecategory/:id").put(Controller.updatecategory)
// router.route("/deletecategory/:id").delete(Controller.deletecategory)


module.exports = router;
