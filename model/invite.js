const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
},{timestamps: true});

const Invite = new mongoose.model("Invite", inviteSchema);
module.exports = Invite;
