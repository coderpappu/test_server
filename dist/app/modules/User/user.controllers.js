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
exports.userController = void 0;
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const user_services_1 = require("./services/user.services");
// get user
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.getUser(req);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "User Account Details",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// get user
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.getUsers();
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "All Users account",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// get user details
const getUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const result = yield user_services_1.userServices.getUserDetails(userId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "User account details",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// login user
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.loginUser(req);
        console.log(req);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "User Account Login successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// create user account
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.createUser(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "User Account create successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// update user
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_services_1.userServices.updateUser(req);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "User Account update successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const deletedUser = yield user_services_1.userServices.deleteUser(id);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "User Account delete successfully",
            data: deletedUser,
        });
    }
    catch (error) {
        next(error);
    }
});
// update password
const updatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log(data);
    try {
        const result = yield user_services_1.userServices.updatePasswordService(data, userId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Password updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.userController = {
    createUser,
    getUser,
    loginUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserDetails,
    updatePassword,
};
