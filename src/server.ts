import { PrismaClient } from "@prisma/client";
import { Server } from "http";
import app from "./app";
const PORT = 5000;

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
  }

  const server: Server = app.listen(PORT, () => {
    console.log("Server is running on", PORT);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info("Your Server is closed");
      });
    }

    process.exit(1);
  };

  process.on("uncaughtException", (error) => {
    console.log(error);
    exitHandler();
  });
  process.on("unhandledRejection", (error) => {
    console.log(error);
    exitHandler();
  });
}

main();
