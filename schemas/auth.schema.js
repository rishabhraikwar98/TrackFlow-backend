const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().nonempty("Name is required").trim().min(3, "Name must be at least 3 characters long").max(50,"Name can not exceed 50 characters"),
  email: z.email("Invalid email").trim(),
  password: z.string().nonempty("Password is required").trim().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z.email("Invalid email").trim(),
  password: z.string().nonempty('Password is required').trim().min(6, "Password must be at least 6 characters long"),
});

module.exports = { registerSchema, loginSchema };
