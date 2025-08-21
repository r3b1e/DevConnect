const express = require("express");

const {
  register,
  login,
  logout,
  updateProfile,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);
router.post('/logout', logout);
router.put('/profile', protect, updateProfile);

module.exports = router;
