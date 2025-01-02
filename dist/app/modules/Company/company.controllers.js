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
exports.companyController = void 0;
const company_services_1 = require("./services/company.services");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const AppErrors_1 = __importDefault(require("../../errors/AppErrors"));
// import httpStatus from "http-status";
// get user
const getCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId)
            throw new AppErrors_1.default(500, "Invalid User Id");
        const result = yield company_services_1.companyServices.getAllCompany(userId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "All Company data successfully get",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// get company details
const getCompanyDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const result = yield company_services_1.companyServices.getCompanyDetails(userId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Your Company Details",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// create company
const createCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    const data = req.body;
    try {
        const result = yield company_services_1.companyServices.createCompany(data, userId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Company created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// update user
const updateCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCompany = yield company_services_1.companyServices.updateCompany(req);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Company profile updated successfully",
            data: updatedCompany,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCompany = yield company_services_1.companyServices.deleteCompany(req.params);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Company deleted successfully!",
            data: deletedCompany,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.companyController = {
    createCompany,
    getCompany,
    getCompanyDetails,
    updateCompany,
    deleteCompany,
};
