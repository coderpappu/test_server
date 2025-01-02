import { PrismaClient } from "@prisma/client"; // Ensure correct import
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { companyRoutes } from "./app/modules/Company/company.routes";
import { userRoutes } from "./app/modules/User/user.routes";

const app: Application = express();
const prisma = new PrismaClient(); // Ensure correct initialization

// Parser
// app.use(cors());
// CORS configuration
app.use(
  cors({
    origin: ["https://payroll.beebangla.com", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");
    res.send({ message: "Your server is running now" });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
  }
});

// application all routes
app.use("/api/user/", userRoutes);
app.use("/api/company/", companyRoutes);

// global error handler
app.use(globalErrorHandler);

export default app;
