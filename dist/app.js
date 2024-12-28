"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const user_routes_1 = require("./app/modules/User/user.routes");
const { PrismaClient } = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new PrismaClient();
// Parser
// app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Root route
app.get("/", (req, res) => {
    res.send({ message: "Your server is running now" });
});
app.use("/api/user/", user_routes_1.userRoutes);
// global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
