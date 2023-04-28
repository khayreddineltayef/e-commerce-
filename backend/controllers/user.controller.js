const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("secret");
exports.register = async (req, res) => {
  const { fullName, email, password, isAdmin, img, phone, adress } = req.body;
  const existantUser = await User.findOne({ email });
  if (existantUser) res.status(409).json({ msg: "user already exist" });
  try {
    const newUser = new User({
      fullName,
      email,
      password,
      isAdmin,
      img,
      phone,
      adress,
    });
    var salt = await bcryptjs.genSalt(10);
    var hash = await bcryptjs.hash(password, salt);
    newUser.password = hash;
    await newUser.save();

    const payload = {
      _id: newUser._id,
      isAdmin: newUser.isAdmin,
      adress: newUser.adress,
    };
    let token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        phone: newUser.phone,
        adress: newUser.adress,

        // phone:newUser.phone,
      },
    });
    // res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "error informations" });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(404).json({ msg: "error informations" });
    const payload = { _id: user._id };
    let token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        adress: user.adress,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
exports.auth = (req, res) => {
  res.send(req.user);
};
//update user
exports.update = async (req, res) => {
  if (req.body.password) {
    const salt = await bcryptjs.genSalt(10);
    req.body.password = await bcryptjs.hash(req.body.password, salt);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
//GET ALL USER
exports.getAll = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};
//get a user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};
//DELETE
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};
//GET USER STATS

exports.getStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          //   _id: { month: "$month", year: "$year" },

          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
////////////////////compare and update password
// const express = require('express');
// const router = express.Router();
// const bcryptjs = require('bcryptjs');
// const User = require('../models/User');

// exports.updatePassword = async (req, res) => {
//   const userId = req.params.userId;
//   const { oldPassword, newPassword } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isPasswordMatched = await bcryptjs.compare(
//       oldPassword,
//       user.password
//     );
//     if (!isPasswordMatched) {
//       return res.status(400).json({ message: "Incorrect old password" });
//     }

//     const salt = await bcryptjs.genSalt(10);
//     const passwordHash = await bcryptjs.hash(newPassword, salt);

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { password: passwordHash },
//       { new: true }
//     );

//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password is correct
    const isMatch = await bcryptjs.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    // Check if the new password is different from the old password
    if (oldPassword === newPassword) {
      return res.status(400).json({
        message: "New password cannot be the same as the old password",
      });
    }

    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    // Update the user's password
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
