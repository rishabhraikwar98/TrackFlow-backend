const express = require("express");
const router = express.Router();
const {
  sendInvite,
  acceptInvite,
  getInvites,
} = require("../controller/inviteController"); 

router.post("/", sendInvite);
router.get("/", getInvites);
router.post("/accept/:inviteId", acceptInvite); 

module.exports = router;

