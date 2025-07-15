const { z } = require("zod");

const IssueSchema = z.object({
  title: z.string().nonempty("Issue title is required").min(3, "Issue title must be at least 3 characters long").max(256, "Project description can not exceed 500 characters"),
  description: z.string().max(500, "Project description can not exceed 500 characters").optional(),
  status: z.enum(["Open", "In_Progress", "Closed"]).optional(),
  priority: z.enum(["Low", "Medium", "High"]).optional(),
  assignedTo: z.string().nonempty("Member's ID required").optional()
});

module.exports = { IssueSchema };
