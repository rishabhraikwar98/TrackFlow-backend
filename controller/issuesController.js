const Issue = require("../model/issue");
const Project = require("../model/project");

const createIssue = async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo } = req.body;
    const { projectId } = req.params;
    const createdBy = req.user._id;
    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (
      !project.createdBy.toString() === req.user._id ||
      !project.members.includes(req.user._id)
    ) {
      req
        .status(403)
        .json({ message: "You are not authorized to create this issue" });
    }
    const issue = new Issue({
      title,
      description,
      status,
      priority,
      createdBy,
      assignedTo,
      projectId,
    });

    await issue.save();
    const response = await Issue.findById(issue._id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .select("-__v -updatedAt -projectId");
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getIssuesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const issues = await Issue.find({ projectId })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1, updatedAt: -1 })
      .select("-__v -updatedAt -projectId");
    return res.status(200).json(issues);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getIssuebyId = async (req, res) => {
  try {
    const { issueId } = req.params;
    const issue = await Issue.findById(issueId)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .select("-__v -updatedAt");
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    return res.status(200).json(issue);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteIssue = async (req, res) => {
  try {
    const { issueId } = req.params;
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    // Check if the user is authorzed to delete the issue
    const project = await Project.findById(issue.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (
      !project.createdBy.toString() === req.user._id ||
      !issue.createdBy.toString() === req.user._id
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this issue" });
    }
    await Issue.findByIdAndDelete(issueId);
    return res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateIssue = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { title, description, status, priority, assignedTo } = req.body;
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }
    // Check if the user is authorized to update the issue
    const project = await Project.findById(issue.projectId);
    if (
      !project.createdBy.toString() === req.user._id ||
      !issue.createdBy.toString() === req.user._id
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this issue" });
    }
    await Issue.findByIdAndUpdate(
      issueId,
      {
        title,
        description,
        status,
        priority,
        assignedTo,
      }
    );
    const response = await Issue.findById(issue._id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .select("-__v -updatedAt -projectId");
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createIssue,
  getIssuesByProject,
  deleteIssue,
  updateIssue,
  getIssuebyId,
};
