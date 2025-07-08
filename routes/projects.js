const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  deleteProject
} = require('../controller/projectsController');

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:projectId', getProjectById);
router.delete('/:projectId', deleteProject);

module.exports = router