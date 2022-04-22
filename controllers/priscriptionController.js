const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const Priscription = require("../models/priscriptionModel");

// ADD REPORT

exports.addpriscription = async (req, res) => {
  try {
    var url=process.env.BASE_URL+"upload/Image"
    const priscriptionImage = req.file ? req.file.filename : null;
    var priscription = new Priscription();
    priscription.priscription = `${url}/${priscriptionImage}`;
    priscription.save(function (err) {
      res.json({
        message: "priscription add Successfully",
        data: priscription,
      });
    });
  } catch (error) {
    console.log(error)
    res.json({
      error:error.message,
      status:400,
      message: "Error find in when adding the priscription",
    });
  }
};

// VIEW REPORT

exports.view = async (req, res) => {
  try {
    const viewpriscription = await Priscription.find({});
    return res.status(200).json(viewpriscription);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};


