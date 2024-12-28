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
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Your server is running now" });
});

app.use("/api/user/", userRoutes);

// global error handler
app.use(globalErrorHandler);

export default app;
