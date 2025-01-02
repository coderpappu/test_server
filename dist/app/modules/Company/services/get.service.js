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
const getAllCompany = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let allCompany;
    if (!userId)
        throw new AppErrors_1.default(404, "User Id Not Found");
    try {
        const allCompany = yield prisma.company.findMany({
            where: {},
        });
        if (!allCompany || allCompany.length <= 0) {
            throw new AppErrors_1.default(404, "Company not found !");
        }
        return allCompany;
    }
    catch (error) {
        throw error;
    }
});
exports.default = getAllCompany;