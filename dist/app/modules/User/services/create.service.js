"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const bcrypt = __importStar(require("bcryptjs"));
const generateAccessToken_1 = __importDefault(require("../../../../utils/generateAccessToken"));
const AppErrors_1 = __importDefault(require("../../../errors/AppErrors"));
const prisma = new client_1.PrismaClient();
// Service for create user account
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let { first_name, last_name, email, phone, password } = data;
    const userExixts = yield prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (userExixts)
        throw new AppErrors_1.default(400, "User Allready exist");
    const hashedPassword = yield bcrypt.hash(password, 10);
    const UserData = {
        first_name,
        last_name,
        email,
        phone,
        password: hashedPassword,
    };
    try {
        const createUser = yield prisma.user.create({
            data: UserData,
        });
        const token = (0, generateAccessToken_1.default)(createUser.id);
        return {
            user: createUser,
            AccessToken: token,
        };
    }
    catch (error) {
        throw error;
    }
});
exports.default = createUser;
