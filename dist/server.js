"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const app_1 = __importDefault(require("./app"));
const PORT = 5000;
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$connect();
            console.log("Database connected successfully!");
        }
        catch (error) {
            console.error("Failed to connect to the database:", error);
            process.exit(1); // Exit the process with failure
        }
        const server = app_1.default.listen(PORT, () => {
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
    });
}
main();
