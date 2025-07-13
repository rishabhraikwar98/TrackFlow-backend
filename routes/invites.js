const express = require("express");
const router = express.Router();
const {
  sendInvite,
  acceptInvite,
  ignoreInvite,
  getInvites,
} = require("../controller/invitesController"); 

router.post("/", sendInvite);
router.get("/", getInvites);
router.post("/accept/:inviteId", acceptInvite); 
router.delete("/ignore/:inviteId", ignoreInvite); 


module.exports = router;

