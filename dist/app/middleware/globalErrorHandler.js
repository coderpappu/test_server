"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppErrors_1 = __importDefault(require("../errors/AppErrors"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const globalErrorHandler = (err, req, res, next) => {
    //setting default values
    let statusCode = 500;
    let message = "Internal Server Error!";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err instanceof AppErrors_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    // if (err instanceof PrismaClientValidationError) {
    //   // statusCode = err?.statusCode;
    //   message = "Prisma Client Validation Error";
    //   errorSources = [
    //     {
    //       path: "",
    //       message: err?.message,
    //     },
    //   ];
    // }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
    return; // Ensure the function returns void
};
exports.default = globalErrorHandler;
