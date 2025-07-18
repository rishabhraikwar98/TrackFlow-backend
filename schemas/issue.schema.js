const { z } = require("zod");

const statusEnum = z.enum(["Open", "In_Progress", "Closed"],{error:"Invalid Status. Status must be one of 'Open', 'In-Progress', or 'Closed'."})
const priorityEnum = z.enum(["Low", "Medium", "High"],{error:"Invalid Priority. Priority must be one of 'Low', 'Medium', or 'High'."})
const issueSchema = z.object({
  title: z.string().nonempty("Issue title is required").min(3, "Issue title must be at least 3 characters long").max(256, "Project description can not exceed 500 characters").trim().optional(),
  description: z.string().max(500, "Project description can not exceed 500 characters").trim().optional(),
  status: statusEnum.optional(),
  priority: priorityEnum.optional(),
  assignedTo: z.string().nonempty("Member's ID required").optional()
});

module.exports = { issueSchema };
