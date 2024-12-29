import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { userRoutes } from "./app/modules/User/user.routes";
const { PrismaClient } = require("@prisma/client");
const app: Application = express();
const prisma = new PrismaClient();
// Parser
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", async (req: Request, res: Response) => {
  try {
    try {
      const allUser = await prisma.user.findMany({});
      res.send({ message: allUser });
    } catch (error) {
      throw error;
    }
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
  }
});

app.use("/api/user/", userRoutes);

// global error handler
app.use(globalErrorHandler);

export default app;
