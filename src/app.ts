import express, { Application, Request, Response } from "express";

const app: Application = express();

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Your server is running now" });
});

export default app;
