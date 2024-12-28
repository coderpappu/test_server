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
const AppErrors_1 = __importDefault(require("../../../errors/AppErrors"));
const prisma = new client_1.PrismaClient();
// update user
const updateUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = data === null || data === void 0 ? void 0 : data.params) === null || _a === void 0 ? void 0 : _a.id;
    if (!id)
        throw new AppErrors_1.default(404, "Please Provide the user Id");
    try {
        const user = yield prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user)
            throw new AppErrors_1.default(404, "User not found");
        // check if the user trying to update is the owner of the profile
        if (id == user.id) {
            const updatedUser = yield prisma.user.update({
                where: {
                    id,
                },
                data: data === null || data === void 0 ? void 0 : data.body,
            });
            if (!updatedUser)
                throw new AppErrors_1.default(404, "User profile not updated");
            return updatedUser;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.default = updateUser;
