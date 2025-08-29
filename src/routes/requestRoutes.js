const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { sendConnectionRequest, reviewConnectionRequest, interestedUsers, acceptedUsers } = require("../controllers/requestController");

router.post("/send/:status/:touserid", protect, sendConnectionRequest);
router.get("/user/interested", protect, interestedUsers);
router.put("/review/:status/:touserid", protect, reviewConnectionRequest);
router.get("/user/accepted", protect, acceptedUsers);   

module.exports = router;
