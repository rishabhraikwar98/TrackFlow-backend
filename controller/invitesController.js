const Invite = require("../model/invite");
const Project = require("../model/project");
const User = require("../model/user");

// Create a new invite
const sendInvite = async (req, res) => {
  try {
    const { projectId, email } = req.body;
    // check if the user registerd
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }
    // Validate project existence
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // check if requesting user is creator of the project
    if (project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to invite users to this project",
      });
    }
    // check if the user is already a member of the project
    const isMember = project.members.some(
      (member) => member.toString() === user._id.toString()
    );
    if (isMember) {
      return res
        .status(400)
        .json({ message: "User is already a member of the project" });
    }
    // Check if the invite already exists
    const existingInvite = await Invite.findOne({ projectId, email });
    if (existingInvite) {
      return res.status(400).json({ message: "Invite already sent" });
    }
    // Create the invite
    const invite = new Invite({ projectId, email });
    await invite.save();
    return res.status(201).json({ message: "Invite sent successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
};
const acceptInvite = async (req, res) => {
  try {
    const { inviteId } = req.params;
    // Validate invite existence
    const invite = await Invite.findById(inviteId);
    if (!invite) {
      return res.status(404).json({ message: "Invite not found" });
    }
    const project = await Project.findById(invite.projectId);
    // Add user to project members
    if (project.members.includes(req.user._id)) {
      return res
        .status(400)
        .json({ message: "You are already a member of this project" });
    }
    project.members.push(req.user._id);
    await project.save();
    // Delete the invite
    await Invite.findByIdAndDelete(inviteId);
    return res.status(200).json({ message: "Invite accepted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
};
const ignoreInvite = async (req, res) => {
  try {
    const { inviteId } = req.params;
    // Validate invite existence
    const invite = await Invite.findById(inviteId);
    if (!invite) {
      return res.status(404).json({ message: "Invite not found" });
    }
    // Delete the invite
    await Invite.findByIdAndDelete(inviteId);
    return res.status(200).json({ message: "Invite Ignored successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
};
const getInvites = async (req, res) => {
  const { email } = req.user;
  try {
    const invites = await Invite.find({ email })
      .populate({
        path: "projectId",
        select: "name createdBy",
        populate: {
          path: "createdBy",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 }).select("-__v -email -createdAt -updatedAt");
    return res.status(200).json(invites);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" });
  }
};
module.exports = {
  sendInvite,
  acceptInvite,
  getInvites,
  ignoreInvite
};
