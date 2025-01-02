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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const updatePasswordService = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = data;
    console.log("check user id ", userId);
    // Fetch user by ID
    const user = yield prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error("User not found");
    }
    // Check if old password matches
    const isMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new Error("Old password is incorrect");
    }
    // Hash new password
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
    // Update user's password
    const updatedUser = yield prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });
    return updatedUser;
});
exports.default = updatePasswordService;
