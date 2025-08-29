const mongoose = require("mongoose");
const User = require('./userSchema');

const connectSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User"
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User"
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is incorrect status type",
      },
      require: true,
    },
  },
  { timestamps: true }
);

const ConnectionRequest = new mongoose.model('Connections', connectSchema);

module.exports = ConnectionRequest;