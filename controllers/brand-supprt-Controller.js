const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const Brand = require("../models/brand-support.Model");

// ADD BRAND


exports.brandAdd = async (req, res) => {
  try {
    var url="https://project-2-monis.herokuapp.com/upload/Image"
    const brandImage = req.file ? req.file.filename : null;
    var brand = new Brand();
    brand.brandAdd = `${url}/${brandImage}`;
    brand.save(function (err) {
      res.json({
        message: "Brand support add Successfully",
        data: brand,
      });
    });
  } catch (error) {
    console.log(error)
    res.json({
      error:error.message,
      status:400,
      message: "Error find in when adding the Brand",
    });
  }
};

// VIEW BRAND

exports.view = async (req, res) => {
  try {
    const viewAllBrand = await Brand.find({});
    return res.status(200).json(viewAllBrand);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// UPDATE BRAND

exports.updateBrand = async (req, res) => {
  const brandAdd = req.file.path;
  try {
    const update = await Brand.findByIdAndUpdate(req.params.id, {
      brandAdd,
    });
    return res.status(200).json(update);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// DELETE BRAND

exports.deleteBrand = async (req, res) => {
  try {
    const deletebyid = await Brand.deleteOne({ _id: req.params.id });
    return res.status(200).json(deletebyid);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
