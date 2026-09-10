const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.route("/")
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders); 

router.route("/myorders").get(protect, getMyOrders);

router.route("/:id")
  .get(protect, getOrderById)
  .put(protect, admin, updateOrderStatus); 

router.route("/:id/status").put(protect, admin, updateOrderStatus);

module.exports = router;