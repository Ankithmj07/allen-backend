import { z } from "zod";

const adminSignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  courses: z.array(z.string().length(24, "Invalid course ID")).optional(),
});


export default adminSignupSchema