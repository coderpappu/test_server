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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
// Middleware to validate user
const validateUser = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Ensure the return type is Promise<void>
        let token;
        const jwtSecret = process.env.JWT_ACCESS_SECRET;
        if (!jwtSecret) {
            res.status(500).json({ msg: "JWT secret is not set" });
            return; // Ensure the function returns void
        }
        // Check for the authorization header
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            try {
                // Get the token from the header
                token = req.headers.authorization.split(" ")[1];
                // Verify the token
                const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
                // Type guard to check if decoded is a JwtPayload
                if (typeof decoded === "object" &&
                    decoded !== null &&
                    "id" in decoded) {
                    // Now TypeScript knows `decoded` is a JwtPayload and has `id`
                    const user = yield prisma.user.findUnique({
                        where: { id: decoded.id },
                    });
                    if (user) {
                        req.user = user;
                    }
                    else {
                        // If user is not found, check for employee
                        // const employee = await prisma.employee.findUnique({
                        //   where: { id: decoded.id },
                        // });
                        // if (employee) {
                        //   req.employee = { ...employee, type: "employee" };
                        // }
                    }
                    if (req.user && roles.includes(req.user.type)) {
                        if (req.user.status !== "SUSPENDED") {
                            next();
                            return; // Ensure the function returns void
                        }
                        else {
                            res.status(403).json({
                                msg: "You do not have permission to access this route",
                            });
                            return; // Ensure the function returns void
                        }
                    }
                    if (req.employee) {
                        if (req.user.status !== "SUSPENDED") {
                            next();
                            return; // Ensure the function returns void
                        }
                        else {
                            res.status(403).json({
                                msg: "You do not have permission to access this route",
                            });
                            return; // Ensure the function returns void
                        }
                    }
                }
                else {
                    res.status(401).json({ msg: "Invalid token payload" });
                    return; // Ensure the function returns void
                }
            }
            catch (error) {
                console.error("Token verification failed:", error);
                res
                    .status(401)
                    .json({ msg: "Token verification failed, authorization denied" });
                return; // Ensure the function returns void
            }
        }
        else {
            res.status(401).json({ msg: "No token provided, authorization denied" });
            return; // Ensure the function returns void
        }
    });
};
// export const protect = (req: Request, res: Response, next: NextFunction) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded; // Assuming the decoded token contains user information
//       next();
//     } catch (error) {
//       throw new AppError(401, "Not authorized, token failed");
//     }
//   }
//   if (!token) {
//     throw new AppError(401, "Not authorized, no token");
//   }
// };
// const authorizeRoles = (...roles: string[]) => {
//   return (
//     req: Request & { user?: any; employee?: any },
//     res: Response,
//     next: NextFunction
//   ) => {
//     if (req.user && roles.includes(req.user.role)) {
//       return next();
//     }
//     if (req.employee && roles.includes(req.employee.role)) {
//       return next();
//     }
//     return res
//       .status(403)
//       .json({ msg: "You do not have permission to access this route" });
//   };
// };
exports.default = validateUser;
// export { authorizeRoles };
