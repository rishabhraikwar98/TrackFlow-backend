const { z } = require("zod");

const projectSchema = z.object({
  name: z
    .string()
    .nonempty("Project name is required")
    .trim()
    .min(3, "Project name must be at least 3 characters long")
    .max(50, "Project name can not exceed 50 characters"),
  description: z
    .string()
    .nonempty("Project description is required")
    .trim()
    .min(10, "Project description must be at least 10 characters long")
    .max(500, "Project description can not exceed 500 characters"),    
});

module.exports = { projectSchema };
