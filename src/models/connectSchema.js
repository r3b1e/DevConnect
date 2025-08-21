const mongoose = require("mongoose");

const connectSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: "{VALUE} is incorrect status type",
      },
      require: true,
    },
  },
  { timestamps: true }
);

const ConnectionRequest = new mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequest;