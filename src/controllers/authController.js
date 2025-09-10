const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Connection = require("../models/connectSchema");

const generateToken = (_id) => {
  return jwt.sign({ id: _id }, "developer", { expiresIn: "7d" });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      bio: user.bio,
      github: user.github,
      gender: user.gender,
      skill: user.skill,
      profileUrl: user.profileUrl,
      location: user.location,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "something went wrong", error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      bio,
      gender,
      skill,
      github,
      profileUrl,
      location,
    } = req.body;

    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      bio,
      password: hashPassword, // ⚠️ should hash before saving
      gender,
      skill,
      github,
      profileUrl,
      location,
    });

    console.log("User created successfully");

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      skill: user.skill,
      profileUrl: user.profileUrl,
      location: user.location,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const viewProfile = async (req, res) => {
  try {
    const requestedUsers = await Connection.find({
      $or: [{ fromUserId: req.user._id }, { toUserId: req.user._id }],
    }).select("fromUserId status toUserId");

    console.log(requestedUsers);

    let connection = 0;
    let interested = 0;
    let completion = 45;

    requestedUsers.forEach((element) => {
      if (element.status === "accepted") {
        connection += 1;
      } else if (element.status === "interested" && element.toUserId === req.user._id) {
        interested += 1;
      }
    });

    if (req.user.bio) completion += 10;
    if (req.user.skill) completion += 15;
    if (req.user.profileUrl) completion += 10;
    if (req.user.github) completion += 10;
    if (req.user.github) completion += 10;

    const userDetail = { ...req.user._doc, connection: connection, interested: interested, completion: completion };
    console.log("data", userDetail);
    res.json(userDetail);
  } catch (err) {
    res
      .status(401)
      .json({ message: "Not getting profile", error: err.message });
  }
};

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  // user.email = req.body.email || user.email;
  console.log(req.body.skill);
  user.skill = req.body.skill || user.skill;
  user.profileUrl = req.body.profileUrl || user.profileUrl;
  user.bio = req.body.bio || user.bio;
  user.github = req.body.bio || user.github;
  user.location = req.body.location || user.location;
  const updatedUser = await user.save();
  res.json(updatedUser);
};

const logout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfull!!");
};

module.exports = { register, login, logout, updateProfile, viewProfile };
