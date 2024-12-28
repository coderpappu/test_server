// src/types/express.d.ts

// Define the User interface
interface TUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  file: string | null;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      user?: TUser; // Augment Request to include the user property
    }
  }
}

interface TEmployee {
  id: string;
  employeeId: string;
  user_id: string;
  company_id: string;
  fingerprint_id: string;
  name: string;
  email: string;
  phone: string;
  present_address: string;
  permanent_address: string;
  gender: "male" | "female" | "other"; // Enum types for strict gender values
  religion: "HINDUISM" | "ISLAM" | "CHRISTIANITY" | "BUDDHISM" | "OTHER"; // Replace with other possible values if needed
  birth_date: string; // Format as 'YYYY-MM-DD'
  joining_date: string; // Format as 'YYYY-MM-DD'
  terminate_date?: string; // Optional if an employee is active
  image: string; // URL of the image
  job_status: "PERMANENT" | "CONTRACT" | "TEMPORARY"; // Enum type for job status
  reference?: string; // Optional field
  spouse_name?: string; // Optional field
  emergency_contact: string;
  id_type: "NID" | "PASSPORT" | "DRIVER_LICENSE" | "OTHER"; // Enum type for ID type
  id_number: string;
  status: "ACTIVE" | "INACTIVE" | "TERMINATED"; // Enum type for status
  password: string;
  createdAt: Date;
  updatedAt: Date;
  type: "employee" | "admin"; // Adjust as needed for different types
}
declare module "node-zklib" {
  const zklib: any; // Use 'any' as a placeholder for the module type.
  export = zklib;
}
declare module "bcryptjs" {
  export function hash(password: string, saltRounds: number): Promise<string>;
  export function compare(password: string, hash: string): Promise<boolean>;
}
