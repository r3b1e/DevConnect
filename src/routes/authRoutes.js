const express = require("express");

const {
  register,
  login,
  logout,
  updateProfile,
  viewProfile,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);
router.post('/logout', logout);
router.put('/profile/edit', protect, updateProfile);
router.get('/profile/view', protect, viewProfile);

module.exports = router;
