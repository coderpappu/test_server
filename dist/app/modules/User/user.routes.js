"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_controllers_1 = require("./user.controllers");
const user_validation_1 = __importDefault(require("./user.validation"));
const router = express_1.default.Router();
// get user data
router.get("/getuser", (0, authMiddleware_1.default)("SUPER_ADMIN", "ADMIN"), user_controllers_1.userController.getUser);
router.get("/getusers", (0, authMiddleware_1.default)("SUPER_ADMIN", "ADMIN"), user_controllers_1.userController.getUsers);
router.get("/getuser/details/:id", (0, authMiddleware_1.default)("SUPER_ADMIN", "ADMIN"), user_controllers_1.userController.getUserDetails);
// login user
router.post("/login", user_controllers_1.userController.loginUser);
// user add route
router.post("/create", (0, validateRequest_1.default)(user_validation_1.default), (0, authMiddleware_1.default)("admin"), user_controllers_1.userController.createUser);
router.put("/update/password", (0, authMiddleware_1.default)("SUPER_ADMIN", "ADMIN"), user_controllers_1.userController.updatePassword);
// update user
router.put("/update/:id", (0, authMiddleware_1.default)("SUPER_ADMIN", "ADMIN"), user_controllers_1.userController.updateUser);
// delete user account
router.delete("/deleteuser/:id", (0, authMiddleware_1.default)("SUPER_ADMIN", "ADMIN"), user_controllers_1.userController.deleteUser);
exports.userRoutes = router;
