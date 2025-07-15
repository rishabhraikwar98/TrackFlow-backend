const { z } = require("zod");

const inviteSchema = z.object({
  projectId: z.string().nonempty("Project ID is required").trim(),
  email: z.email("Invalid email").trim(),
});
module.exports =  {inviteSchema}