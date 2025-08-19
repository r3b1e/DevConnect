const mongoose = require("mongoose");

const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254, // RFC max
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(v),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 60, // bcrypt hash length is typically 60
      maxlength: 100, // allow some headroom for different algorithms
    },
    gender: {
      type: String,
      enum: GENDERS,
      required: true,
    },
    skill: {
      type: [
        {
          type: String,
          trim: true,
          minlength: 1,
          maxlength: 50,
        },
      ],
      validate: [
        {
          validator: (arr) =>
            Array.isArray(arr) && arr.length >= 1 && arr.length <= 20,
          message: "Skill array must have between 1 and 20 items",
        },
      ],
    },
    profileUrl: {
      type: String,
      trim: true,
      maxlength: 2048,
      validate: {
        validator: (v) => {
          if (!v) return true;
          try {
            const u = new URL(v);
            return u.protocol === "http:" || u.protocol === "https:";
          } catch {
            return false;
          }
        },
        message: "Invalid URL",
      },
    },
    location: {
      type: String,
      trim: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('User', userSchema);
