const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const Receipt = require("../models/receiptsModel");

// ADD REPORT

exports.addreceipt = async (req, res) => {
  try {
    var url="https://project-2-monis.herokuapp.com/upload/Image"
    const receiptImage = req.file ? req.file.filename : null;
    var receipt = new Receipt();
    receipt.receipt = `${url}/${receiptImage}`;
    receipt.save(function (err) {
      res.json({
        message: "Receipt add Successfully",
        data: receipt,
      });
    });
  } catch (error) {
    console.log(error)
    res.json({
      error:error.message,
      status:400,
      message: "Error find in when adding the Receipt",
    });
  }
};

// VIEW REPORT

exports.view = async (req, res) => {
  try {
    const viewreceipt = await Receipt.find({});
    return res.status(200).json(viewreceipt);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};


