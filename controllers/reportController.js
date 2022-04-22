const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const Report = require("../models/reportModel");

// ADD REPORT

exports.addreport = async (req, res) => {
  try {
    var url=process.env.BASE_URL+"upload/Image"
    const reportImage = req.file ? req.file.filename : null;
    var report = new Report();
    report.report = `${url}/${reportImage}`;
    report.save(function (err) {
      res.json({
        message: "Report add Successfully",
        data: report,
      });
    });
  } catch (error) {
    console.log(error)
    res.json({
      error:error.message,
      status:400,
      message: "Error find in when adding the Report",
    });
  }
};

// VIEW REPORT

exports.view = async (req, res) => {
  try {
    const viewreport = await Report.find({});
    return res.status(200).json(viewreport);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};


