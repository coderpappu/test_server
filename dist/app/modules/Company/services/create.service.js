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
const createCompany = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { company_name, address, country, city, state, postal_code, phone_number, company_registration_no, fax, website_url, date_format, timezone, } = data;
    // Validate required fields
    if (!company_name ||
        !address ||
        !country ||
        !city ||
        !state ||
        !phone_number) {
        throw new AppErrors_1.default(400, "Please provide all required data");
    }
    try {
        // Check if company already exists for the user
        const companyExists = yield prisma.company.findFirst({
            where: {
                userId: userId,
                AND: [{ company_name: company_name }],
            },
        });
        if (companyExists) {
            throw new AppErrors_1.default(400, "Company with this name or email already exists for the user");
        }
        // Use a transaction to create the company and the associated setting
        const result = yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            const createdCompanyDetails = yield prisma.company.create({
                data: {
                    company_name,
                    address,
                    country,
                    city,
                    state,
                    postal_code,
                    company_registration_no,
                    phone_number,
                    fax,
                    website_url,
                    date_format,
                    timezone,
                    userId,
                },
            });
            const createdSetting = yield prisma.setting.create({
                data: {
                    company_id: createdCompanyDetails.id,
                    user_id: userId,
                },
            });
            return { createdCompanyDetails, createdSetting };
        }));
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.default = createCompany;
