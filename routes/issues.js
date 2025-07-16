const express = require("express");
const router = express.Router();
const {
  createIssue,
  getIssuesByProject,
  deleteIssue,
  updateIssue,
  getIssuebyId
} = require("../controller/issuesController");

const validationMiddleware = require("../middleware/validationMiddleware")
const {issueSchema} = require("../schemas/issue.schema")

router.post("/:projectId",validationMiddleware(issueSchema),createIssue);
router.get("/:projectId", getIssuesByProject);
router.get("/view/:issueId", getIssuebyId);
router.patch("/:issueId",validationMiddleware(issueSchema), updateIssue)
router.delete("/:issueId", deleteIssue);
module.exports = router;
