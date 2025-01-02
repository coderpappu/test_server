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
const deleteCompany = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const id = params === null || params === void 0 ? void 0 : params.id;
    if (!id)
        throw new AppErrors_1.default(404, "Invalid Company ID!");
    try {
        const companyExists = yield prisma.company.findUnique({
            where: {
                id,
            },
        });
        if (!companyExists)
            throw new AppErrors_1.default(409, "Company not exists");
        const deletedcompany = yield prisma.company.delete({
            where: {
                id,
            },
        });
        return deletedcompany;
    }
    catch (error) {
        throw error;
    }
});
exports.default = deleteCompany;
