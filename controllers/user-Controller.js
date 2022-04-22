const User = require("../models/user-model")
const Otp = require("../models/otp-model")
const twilio = require('twilio');
const sendSms = require('../twilio');
const otpGenerator = require('otp-generator');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const createToken = (user) => {
  return jwt.sign({ user }, process.env.PROCESS_KEY, {
    expiresIn: "7d",
  });
};

// SEND OTP

exports.sendotp = async (req, res) => {
  try {
    const OTP = otpGenerator.generate(4, { digits: true, upperCaseAlphabets: false, specialChars: false });
    // const OTP = 1234
    let user = await User.findOne({
      number: req.body.number
    })
    if (!user) {
      user = new User()
      user.number = req.body.number
      await user.save()
    }

    if (user) {
      const otp = new Otp()
      otp.number = req.body.number
      otp.otp = OTP
      const result = await otp.save();
    }
    //await user.save()
    const welcomeMessage = `Your verification code is: ${OTP}`;
    console.log(welcomeMessage)
    console.log(user.number)
    const messageres = await sendSms(user.number, welcomeMessage);
    console.log(messageres)
    return res.status(201).send({
      message: 'Account created successfully, kindly check your phone to activate your account!',
      data: user,
    })

  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: error.message })
  }
}

// VERIFY OTP

exports.verifyOtp = async (req, res) => {
  try {
    var { number, otp } = req.body;

    let newotp = await Otp.findOne({ number: number, otp: otp });
    if (!newotp) {
      return res.status(400).json({ errors: 'wrong otp' })
    }
    if (newotp) {
      var number = req.body.number;
      let user = await User.findOne({ number });
      console.log(user.number)
      const token = createToken(user);
      const OTPDelete = await Otp.deleteOne({
        number: number
      });
      return res.status(200).json({ msg: "user login successfully", user, token });
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ errors: [{ msg: "Token Expired" }] });
  }
}
// ADD USER DETAIL

exports.adduser = async (req, res) => {
  const number = req.body.number;
  const checkUser = await User.findOne({
    number: number
  });
  if (checkUser) {
    return res.status(400).json({
      errors: [{ msg: "Number is already taken" }]
    });
  }
  const { name, email, age, gender } = req.body;
  const profileImage = req.file ? req.file.filename : null;
  try {
    const update = await User.findByIdAndUpdate(req.user._id, {
      name,
      email,
      age,
      gender,
    });
    console.log(update)
    if (update) {
      res.json({
        message: "add user successfully",
        data: update,
      });
    } else {
      res.json({
        message: "user not update",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// GET USER

exports.getuser = async (req, res) => {
  try {
    const getuser = await User.find({ user: req.user.id })
    console.log(getuser)
    return res.status(200).json({ msg: "get user successfully", getuser })
  } catch (error) {
    return res.status(400).json({ msg: "something went wrong" })
  }
}

//UPDATE USER 

exports.updateuser = async (req, res) => {
  const { number, name, email, age, gender } = req.body;
  var url = "http://localhost:2999/api/upload/Image"
  const profileImage = req.file ? req.file.filename : null;
  try {
    const update = await User.findByIdAndUpdate(req.user._id, {
      name,
      email,
      age,
      gender,
      number,
      image: `${url}/ ${profileImage}`,
    });
    console.log(update)
    if (update) {
      res.json({
        message: "update user successfully",
        data: update,
      });
    } else {
      res.json({
        message: "user not update",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// DELETE USER

exports.deleteuser = async (req, res) => {
  try {
    const deleteuser = await User.findByIdAndDelete(req.user._id,)
    return res.status(200).json({ msg: "delete user successfully", deleteuser })
  } catch (error) {
    return res.status(400).json({ msg: "something went wrong" })
  }
}

//GET ALL USER  

exports.getalluser = async (req, res) => {
  try {
    const getalluser = await User.find({})
    return res.status(200).json({ msg: "get all user successfully", getalluser })
  } catch (error) {
    return res.status(400).json({ msg: "something went wrong" })
  }
}