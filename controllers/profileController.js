const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const Profile = require("../models/profileModel");
const { profile } = require("console");

// ADD PROFILE

var url="https://project-2-monis.herokuapp.com/upload/Image"
exports.profileadd = async (req, res) => {
  try {
    const profileimage = req.file ? req.file.filename : null;
    var profile = new Profile();
    profile.profileimage = `${url}/${profileimage}`;
    profile.profilename=req.body.profilename
    profile.save(function (err) {
      if(err){
        console.log(err)
        return res.status(500).json({
          msg: err.msg
        })
      }
      return res.json({
        message: "profile add Successfully",
        data: profile,
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
    const profilefind = await Profile.find({});
    return res.status(200).json(profilefind);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// UPDATE PROFILE

exports.updateprofile = async (req, res) => {
  const profileimage = req.file.path;
  try {
    const update = await Profile.findByIdAndUpdate(req.params.id, {
        profileimage:profileimage,
    });
    return res.status(200).json(update);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// DELETE PROFILE

exports.deleteprofile = async (req, res) => {
  try {
    const deleteprofile = await Profile.deleteOne({ _id: req.params.id });
    return res.status(200).json(deleteprofile);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
