const express = require("express");
const router = express.Router();
const {
  sendInvite,
  acceptInvite,
  ignoreInvite,
  getInvites,
} = require("../controller/invitesController"); 

const {inviteSchema} = require("../schemas/invite.schema")
const validationMiddleware = require("../middleware/validationMiddleware")

router.post("/",validationMiddleware(inviteSchema), sendInvite);
router.get("/", getInvites);
router.post("/accept/:inviteId", acceptInvite); 
router.delete("/ignore/:inviteId", ignoreInvite); 


module.exports = router;

