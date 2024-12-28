import { z } from "zod";

const UserRole = z.enum(["SUPER_ADMIN", "ADMIN", "SUBSCRIBER"]);
const UserStatus = z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]);

const UserValidationSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => crypto.randomUUID()), // Default value is a UUID
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(), // Optional field
  password: z.string().min(8, "Password must be at least 8 characters long"),
  file: z.string().optional(), // Optional field
  type: UserRole.default("SUPER_ADMIN"), // Default is SUPER_ADMIN
  status: UserStatus.default("ACTIVE"), // Default is ACTIVE
  createdAt: z.date().default(() => new Date()), // Default to the current date/time
  updatedAt: z
    .date()
    .default(() => new Date())
    .transform(() => new Date()), // Update on each call
});

export default UserValidationSchema;
