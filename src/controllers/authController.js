const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const generateToken = (_id)=>{
  return jwt.sign({id:_id}, "developer", {expiresIn: "7d"});
}

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

    const token =await generateToken(user._id);

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    


    res.json({
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
      gender,
      skill,
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
      password: hashPassword, // ⚠️ should hash before saving
      gender,
      skill,
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

const logout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  })
  res.send("Logout Successfull!!");
}

module.exports = { register, login, logout };
