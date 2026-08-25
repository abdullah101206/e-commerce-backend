const express = require("express");
const router = express.Router();
const {
  getAdminStats,
  getAllUsers,
  deleteUser,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.use(protect, admin);

router.get("/stats", getAdminStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

module.exports = router;