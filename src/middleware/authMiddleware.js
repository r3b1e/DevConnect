const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const protect = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Please login first!" });
    }

    const decodeId = jwt.verify(token, "developer");
    const { id } = decodeId;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: "Server error", error: err.message });
  }
};

module.exports = protect;
