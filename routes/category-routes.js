let router = require("express").Router();
const Controller=require("../controllers/categoryController")
const auth=require("../middleware/auth")

// CATEGORY ROUTE

router.route("/addcategory").post(auth.adminloggedIn,Controller.addcategory)
router.route("/getsinglecategory/:id").get(Controller.getsinglecategory)
router.route("/getallcategory").get(Controller.getallcategory)
router.route("/updatecategory/:id").put(Controller.updatecategory)
router.route("/deletecategory/:id").delete(Controller.deletecategory)
router.route("/searchcategory/:name").get(Controller.search);

module.exports = router;
