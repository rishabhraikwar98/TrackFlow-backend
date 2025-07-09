const express = require("express");
const router = express.Router();
const {
  createIssue,
  getIssuesByProject,
  deleteIssue,
  updateIssue,
  getIssuebyId
} = require("../controller/issuesController");

router.post("/:projectId", createIssue);
router.get("/:projectId", getIssuesByProject);
router.get("/view/:issueId", getIssuebyId);
router.patch("/:issueId", updateIssue)
router.delete("/:issueId", deleteIssue);
module.exports = router;
