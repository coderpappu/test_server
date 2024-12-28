"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const create_service_1 = __importDefault(require("./create.service"));
const delete_service_1 = __importDefault(require("./delete.service"));
const getuser_service_1 = __importDefault(require("./getuser.service"));
const getUserDetails_service_1 = __importDefault(require("./getUserDetails.service"));
const getUsers_service_1 = __importDefault(require("./getUsers.service"));
const login_service_1 = __importDefault(require("./login.service"));
const update_service_1 = __importDefault(require("./update.service"));
const updatePassword_service_1 = __importDefault(require("./updatePassword.service"));
exports.userServices = {
    createUser: create_service_1.default,
    getUser: getuser_service_1.default,
    getUsers: getUsers_service_1.default,
    loginUser: login_service_1.default,
    updateUser: update_service_1.default,
    deleteUser: delete_service_1.default,
    getUserDetails: getUserDetails_service_1.default,
    updatePasswordService: updatePassword_service_1.default,
};
