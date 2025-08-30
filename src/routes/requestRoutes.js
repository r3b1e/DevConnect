const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { sendConnectionRequest, reviewConnectionRequest, interestedUsers, acceptedUsers, userFeed } = require("../controllers/requestController");

router.post("/send/:status/:touserid", protect, sendConnectionRequest);
router.put("/review/:status/:touserid", protect, reviewConnectionRequest);
router.get("/user/interested", protect, interestedUsers);
router.get("/user/accepted", protect, acceptedUsers);  
router.get("/user/feed", protect, userFeed); 

module.exports = router;
