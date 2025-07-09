const Issue = require("../model/issue");
const Project = require("../model/project");

const createIssue = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const { projectId } = req.params;
    const createdBy = req.user._id;
    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const issue = new Issue({
      title,
      description,
      status,
      priority,
      createdBy,
      projectId,
    });

    await issue.save();
    res.status(201).json({ message: "Issue created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      .select("-__v -updatedAt");
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
    // Check if the user is authorized to delete the issue
    const project = await Project.findById(issue.projectId);
    if (
      project.createdBy.toString() !== req.user._id.toString() ||
      issue.createdBy.toString() !== req.user._id.toString()
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
      project.createdBy.toString() !== req.user._id.toString() &&
      issue.createdBy.toString() !== req.user._id.toString()
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
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({ message: "Issue updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createIssue,
  getIssuesByProject,
  deleteIssue,
  updateIssue,
  getIssuebyId
};
