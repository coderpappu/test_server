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
const AppErrors_1 = __importDefault(require("../../../errors/AppErrors"));
const prisma = new client_1.PrismaClient();
// service for get user data
const getUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userData = data === null || data === void 0 ? void 0 : data.user;
        let employeeData = data === null || data === void 0 ? void 0 : data.employee;
        if (!userData && !employeeData)
            throw new AppErrors_1.default(404, "User data not found");
        if (userData) {
            return userData;
        }
        else {
            return employeeData;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.default = getUser;
