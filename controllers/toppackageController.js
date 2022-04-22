const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const Toppackage = require("../models/toppackageModel");


// ADD PROFILE

var url="https://project-2-monis.herokuapp.com/upload/Image"
exports.toppackageadd = async (req, res) => {
  try {
    const packageimage = req.file ? req.file.filename : null;
    var package = new Toppackage();
    package.packageimage = `${url}/${packageimage}`;
    package.packagename=req.body.packagename
    package.save(function (err) {
      if(err){
        console.log(err)
        return res.status(500).json({
          msg: err.msg
        })
      }
      return res.json({
        message: "Top Package add Successfully",
        data: package,
      });
    });
  } catch (error) {
    res.json({
      message: "Error find in when adding the Package",
    });
  }
};

// VIEW PROFILE

exports.view = async (req, res) => {
  try {
    const Packagefind = await Toppackage.find({});
    return res.status(200).json(Packagefind);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// UPDATE PROFILE

exports.updatedpackage = async (req, res) => {
  const packageimage = req.file.path;
  const packagename=req.body.packagename
  try {
    const updatedpackage = await Toppackage.findByIdAndUpdate(req.params.id, {
        packageimage:packageimage,
        packagename
    });
    return res.status(200).json(updatedpackage);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// DELETE PROFILE

exports.deletedpackage = async (req, res) => {
  try {
    const deletedpackage = await Toppackage.deleteOne({ _id: req.params.id });
    return res.status(200).json(deletedpackage);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
