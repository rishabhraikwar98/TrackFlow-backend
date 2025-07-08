const Project = require("../model/project");
// Create project
const createProject = async (req, res) => {
  const { name, description } = req.body;
  try {
    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
      members: [req.user._id],
    });
    await project.save();
    return res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get all projects where user is a member
const getProjects = async (req, res) => {
  const projects = await Project.find({
    members: req.user._id,
  })
    .populate("createdBy", "name email")
    .populate("members", "name email")
    .sort({ createdAt: -1 })
    .select("-__v -updatedAt");

  res.status(200).json(projects);
};

// Get single project with member details
const getProjectById = async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    return res.status(400).json({ message: "Project ID is required" });
  }
  try {
    let project = await Project.findById(projectId);
    if (!project || !project.members.includes(req.user._id)) {
      return res
        .status(404)
        .json({ message: "Project not found or access denied" });
    }
    project = await Project.findById(projectId)
      .populate("createdBy", "name email")
      .populate("members", "name email")
      .select("-__v -updatedAt");
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// delete project
const deleteProject = async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    return res.status(400).json({ message: "Project ID is required" });
  }
  try {
    const project = await Project.findByIdAndDelete(projectId);
    if (!project || !project.members.includes(req.user._id)) {
      return res
        .status(404)
        .json({ message: "Project not found or access denied" });
    }
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
};
