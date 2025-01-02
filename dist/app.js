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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const company_routes_1 = require("./app/modules/Company/company.routes");
const user_routes_1 = require("./app/modules/User/user.routes");
const { PrismaClient } = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new PrismaClient();
// Parser
// app.use(cors());
// CORS configuration
app.use((0, cors_1.default)({
    origin: ["https://payroll.beebangla.com", "http://localhost:5173"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Root route
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$connect();
        console.log("Database connected successfully!");
        res.send({ message: "Your server is running now" });
    }
    catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1); // Exit the process with failure
    }
}));
// application all routes
app.use("/api/user/", user_routes_1.userRoutes);
app.use("/api/company/", company_routes_1.companyRoutes);
app.get("/company", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ message: "Company route is working" });
}));
// global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
