"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRoutes = void 0;
const express_1 = __importDefault(require("express"));
const test_controllers_1 = require("./test.controllers");
const router = express_1.default.Router();
router.get("/company", test_controllers_1.companyController.companyCheck);
exports.testRoutes = router;
