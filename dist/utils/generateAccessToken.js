"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// genarate access token
// expires in 20 sec
const generateAccessToken = (id) => {
    const JWT_SECRET = process.env.JWT_ACCESS_SECRET;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jsonwebtoken_1.default.sign({ id }, JWT_SECRET, {
        expiresIn: "30d",
    });
};
exports.default = generateAccessToken;
