const express = require("express");
const { verifiyAuth } = require("../middlewares/verifiyToken");
const {
  addCart,
  getAllCarts,
  updateCart,
  deleteCart,
  deleteProductFromCart,
} = require("../controllers/cart.controller");
const router = express.Router();
router.post("/add", addCart);
router.get("/:userId", getAllCarts);
router.put("/:id", updateCart);
// router.delete("/:id", deleteCart);
router.delete("/:cartId/product/:productId", deleteProductFromCart);

module.exports = router;
