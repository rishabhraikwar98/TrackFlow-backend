const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
  updateProject,
  leaveProject
} = require('../controller/projectsController');

const {projectSchema} = require("../schemas/project.schema")
const validationMiddleware = require("../middleware/validationMiddleware")
router.post('/',validationMiddleware(projectSchema),createProject);
router.get('/', getProjects);
router.get('/:projectId', getProjectById);
router.delete('/:projectId', deleteProject);
router.patch('/:projectId',validationMiddleware(projectSchema),updateProject)
router.patch('/:projectId/leave',leaveProject)

module.exports = router