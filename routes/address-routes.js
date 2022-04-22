const express = require('express');
const router = express.Router();
const {Addadress,getAddress} = require("../controllers/addressController");
const auth=require("../middleware/auth")


router.post('/address',auth.userloggedIn,Addadress)
router.get('/address',auth.userloggedIn,getAddress)

module.exports = router