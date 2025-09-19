// const { mongo } = require('mongoose');
const mongoose = require("mongoose");

const massageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const chatSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  ],
  messages: [massageSchema],
});

module.exports = mongoose.model("Chat", chatSchema)