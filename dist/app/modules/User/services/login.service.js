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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateAccessToken_1 = __importDefault(require("../../../../utils/generateAccessToken"));
const AppErrors_1 = __importDefault(require("../../../errors/AppErrors"));
const prisma = new client_1.PrismaClient();
// login user
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data === null || data === void 0 ? void 0 : data.body;
    console.log(email, password);
    if (!email || !password)
        throw new AppErrors_1.default(404, "Please Provide all required information");
    const user = yield prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user)
        throw new AppErrors_1.default(404, "User Not Found!");
    try {
        if (user && (yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password))) {
            const accessToken = (0, generateAccessToken_1.default)(user === null || user === void 0 ? void 0 : user.id);
            return { user, accessToken };
        }
        else {
            throw new AppErrors_1.default(404, "Invalid Creadential!");
        }
    }
    catch (error) {
        throw error;
    }
});
exports.default = loginUser;
