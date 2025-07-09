const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxlength: 256,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["Open", "In-Progress", "Closed"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true }
);

const Issue = new mongoose.model("Issue", issueSchema);
module.exports = Issue;
