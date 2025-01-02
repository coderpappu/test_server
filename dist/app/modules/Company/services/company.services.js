"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyServices = void 0;
const create_service_1 = __importDefault(require("./create.service"));
const delete_service_1 = __importDefault(require("./delete.service"));
const get_service_1 = __importDefault(require("./get.service"));
const getdetails_service_1 = __importDefault(require("./getdetails.service"));
const update_service_1 = __importDefault(require("./update.service"));
exports.companyServices = {
    createCompany: create_service_1.default,
    getAllCompany: get_service_1.default,
    getCompanyDetails: getdetails_service_1.default,
    updateCompany: update_service_1.default,
    deleteCompany: delete_service_1.default,
};
