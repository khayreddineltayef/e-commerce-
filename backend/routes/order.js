const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
////create a new order
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      phone,

      city,

      country,
      card,
      cardNumber,

      amount,
    } = req.body;
    const newOrder = new Order({
      userId,
      firstName,
      lastName,
      phone,

      city,

      country,
      card,
      cardNumber,

      amount,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
////find the user orders
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
