const express = require("express");
const protect = require("../middleware/authMiddleware");
const Chat = require("../models/chat");

const router = express.Router();

router.get("/message/:touserid", protect,async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.touserid;

    const chatData =await Chat.findOne({
      participants: { $all: [fromUserId, toUserId] },
    }).populate({path: 'messages.senderId', select: "firstName lastName"});

    res.json({
        message: chatData.messages
    })
    
//   res.send(ChatData);
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong While Massaging",
      error: err.message,
    });
  }

});

module.exports = router;
