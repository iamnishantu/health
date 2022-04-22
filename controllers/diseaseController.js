const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const Disease = require("../models/diseaseModel");
const { profile } = require("console");

// ADD PROFILE

var url="https://project-2-monis.herokuapp.com/upload/Image"
exports.diseaseadd = async (req, res) => {
  try {
    const diseaseimage = req.file ? req.file.filename : null;
    var disease = new Disease();
    disease.diseaseimage = `${url}/${diseaseimage}`;
    disease.diseasename=req.body.diseasename
    disease.save(function (err) {
      if(err){
        console.log(err)
        return res.status(500).json({
          msg: err.msg
        })
      }
      return res.json({
        message: "disease add Successfully",
        data: disease,
      });
    });
  } catch (error) {
    res.json({
      message: "Error find in when adding the banner",
    });
  }
};

// VIEW PROFILE

exports.view = async (req, res) => {
  try {
    const diseasefind = await Disease.find({});
    return res.status(200).json(diseasefind);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// UPDATE PROFILE

exports.updatedisease = async (req, res) => {
  const diseaseimage = req.file.path;
  const diseasename=req.body.diseasename
  try {
    const update = await Disease.findByIdAndUpdate(req.params.id, {
      diseaseimage:diseaseimage,
      diseasename
    });
    return res.status(200).json(update);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// DELETE PROFILE

exports.deletedisease = async (req, res) => {
  try {
    const deletedisease = await Disease.deleteOne({ _id: req.params.id });
    return res.status(200).json(deletedisease);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
