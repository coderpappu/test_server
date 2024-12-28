"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrismaClientValidationError extends Error {
    constructor(statusCode, message, prismaCode) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.prismaCode = prismaCode;
    }
}
exports.default = PrismaClientValidationError;
