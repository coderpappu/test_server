"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const company_controllers_1 = require("./company.controllers");
const company_validation_1 = __importDefault(require("./company.validation"));
const router = express_1.default.Router();
// all company get
router.get("/getcompany", company_controllers_1.companyController.getCompany);
// authMiddleware("SUPER_ADMIN", "ADMIN"),
router.get("/company", company_controllers_1.companyController.companyCheck);
// specific company details get
router.get("/getcompanydetails/:id", (0, authMiddleware_1.default)("SUPER_ADMIN", "ADMIN"), company_controllers_1.companyController.getCompanyDetails);
// create company
router.post("/createcompany", (0, authMiddleware_1.default)("SUPER_ADMIN", "ADMIN"), (0, validateRequest_1.default)(company_validation_1.default), company_controllers_1.companyController.createCompany);
// company details update
router.put("/updatecompany/:id", (0, authMiddleware_1.default)("SUPER_ADMIN", "ADMIN"), (0, validateRequest_1.default)(company_validation_1.default), company_controllers_1.companyController.updateCompany);
// company delete
router.delete("/deletecompany/:id", (0, authMiddleware_1.default)("SUPER_ADMIN", "ADMIN"), company_controllers_1.companyController.deleteCompany);
exports.companyRoutes = router;
