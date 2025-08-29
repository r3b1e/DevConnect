const { connect } = require("mongoose");
const Connection = require("../models/connectSchema");
const User = require("../models/userSchema");

const sendConnectionRequest = async (req, res) => {
  try {
    const user = req.user;
    console.log("Sending a connection request");
    const fromUserId = user._id;
    const { status, touserid } = req.params;

    const toUserExist = await User.findOne({
      _id: touserid,
    });

    if (!toUserExist) {
      return res.status(400).json({ message: "User not exist" });
    }

    const allowedStatus = ["ignored", "interested"];

    if (!allowedStatus.includes(status)) {
      return res.status(401).json({ Message: "Invalid status type" });
    }

    if (touserid == fromUserId) {
      return res.status(401).json({ message: "Can not send to same user" });
    }

    const existingConnectionRequest = await Connection.find({
      $or: [
        { fromUserId, toUserId: touserid },
        { fromUserId: touserid, toUserId: fromUserId },
      ],
    });

    console.log(existingConnectionRequest);

    if (existingConnectionRequest) {
      console.log(touserid, fromUserId);
      // const entry = await Connection.create()
      return res.status(401).json({ message: "Request faild" });
    }

    const entry = await Connection.create({
      fromUserId: fromUserId,
      toUserId: touserid,
      status: status,
    });
    res.json(entry);
  } catch (err) {
    res.status(401).json({ message: "Server Error", error: err.message });
  }
};

const interestedUsers = async (req, res) => {
  try {
    const allRequest = await Connection.find({
      toUserId: req.user._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);
    // console.log(allRequest);
    res.json(allRequest);
  } catch (err) {
    res.status(401).json({ message: "Server error", error: err });
  }
};

const acceptedUsers = async (req, res) => {
  try {
    const friends = await Connection.find({
      $or: [
        { status: "accepted", fromUserId: req.user._id },
        { status: "accepted", toUserId: req.user._id },
      ],
    })
      .populate("fromUserId", "firstName lastName email gender skill profileUrl location")
      .populate("toUserId", "firstName lastName email gender skill profileUrl location");
//
    const result = friends.map((connection) => {
      let friend;
      if(connection.fromUserId._id .equals( req.user._id )){
        friend = connection.toUserId;
      }
      else{
        friend = connection.fromUserId;
      }
      return friend;
    })

     res.send(result);

  } catch (err) {
    res.status(401).json({ message: "Server error", error: err });
  }
};

const reviewConnectionRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;

    const { status, touserid } = req.params;
    console.log(fromUserId, touserid);

    const isExist = await User.findById(touserid);

    if (!isExist) {
      return res.status(401).json({
        message: "User not exits",
      });
    }

    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(401).json({ message: "Invalid status type" });
    }

    const interestedUsers = await Connection.findOne({
      toUserId: fromUserId,
      fromUserId: touserid,
      status: "interested",
    });

    if (!interestedUsers) {
      return res.status(401).json({ message: "no match found" });
    }

    interestedUsers.status = status;

    const entry = await interestedUsers.save();

    console.log("error");

    res.json(entry);
  } catch (error) {
    res.status(401).json({ message: "Server error", error: error });
  }
};

module.exports = {
  sendConnectionRequest,
  reviewConnectionRequest,
  interestedUsers,
  acceptedUsers
};
