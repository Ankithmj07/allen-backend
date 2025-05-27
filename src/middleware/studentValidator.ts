import { z } from "zod";

const studentSignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  classLevel: z.number().refine((val) => val === 11 || val === 12),
  exam: z.enum(["JEE Mains","JEE Advanced", "NEET"])
});


export default studentSignupSchema