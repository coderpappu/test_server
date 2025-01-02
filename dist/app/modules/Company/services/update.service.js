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
const updateCompany = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const id = (_a = data === null || data === void 0 ? void 0 : data.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        if (!id) {
            throw new AppErrors_1.default(404, "Company id not found!");
        }
        const company = yield prisma.company.findUnique({
            where: { id },
        });
        if (!company) {
            throw new AppErrors_1.default(404, "No such Company Exists!");
        }
        if (data.user.type === "SUPER_ADMIN" || data.user.type === "ADMIN") {
            if ((_b = data === null || data === void 0 ? void 0 : data.body) === null || _b === void 0 ? void 0 : _b.company_name) {
                const companyNameExists = yield prisma.company.findFirst({
                    where: { company_name: (_c = data === null || data === void 0 ? void 0 : data.body) === null || _c === void 0 ? void 0 : _c.company_name },
                });
                if (companyNameExists && companyNameExists.id !== id) {
                    throw new AppErrors_1.default(409, "Company name already exists!");
                }
            }
            const updatedCompany = yield prisma.company.update({
                where: { id },
                data: data.body,
            });
            return updatedCompany;
        }
        else {
            throw new AppErrors_1.default(403, "Unauthorized user type!");
        }
    }
    catch (error) {
        console.error("Error updating company:", error);
        throw error;
    }
});
exports.default = updateCompany;
