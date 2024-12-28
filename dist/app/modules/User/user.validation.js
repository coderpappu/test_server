"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const UserRole = zod_1.z.enum(["SUPER_ADMIN", "ADMIN", "SUBSCRIBER"]);
const UserStatus = zod_1.z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]);
const UserValidationSchema = zod_1.z.object({
    id: zod_1.z
        .string()
        .uuid()
        .default(() => crypto.randomUUID()), // Default value is a UUID
    first_name: zod_1.z.string().min(1, "First name is required"),
    last_name: zod_1.z.string().min(1, "Last name is required"),
    email: zod_1.z.string().email("Invalid email format"),
    phone: zod_1.z.string().optional(), // Optional field
    password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
    file: zod_1.z.string().optional(), // Optional field
    type: UserRole.default("SUPER_ADMIN"), // Default is SUPER_ADMIN
    status: UserStatus.default("ACTIVE"), // Default is ACTIVE
    createdAt: zod_1.z.date().default(() => new Date()), // Default to the current date/time
    updatedAt: zod_1.z
        .date()
        .default(() => new Date())
        .transform(() => new Date()), // Update on each call
});
exports.default = UserValidationSchema;
