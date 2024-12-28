import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Middleware to validate user
const validateUser = (...roles: string[]) => {
  return async (
    req: Request & { user?: any; employee?: any },
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // Ensure the return type is Promise<void>
    let token;
    const jwtSecret = process.env.JWT_ACCESS_SECRET;

    if (!jwtSecret) {
      res.status(500).json({ msg: "JWT secret is not set" });
      return; // Ensure the function returns void
    }

    // Check for the authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get the token from the header
        token = req.headers.authorization.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, jwtSecret);

        // Type guard to check if decoded is a JwtPayload
        if (
          typeof decoded === "object" &&
          decoded !== null &&
          "id" in decoded
        ) {
          // Now TypeScript knows `decoded` is a JwtPayload and has `id`
          const user = await prisma.user.findUnique({
            where: { id: decoded.id },
          });

          if (user) {
            req.user = user;
          } else {
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
            } else {
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
            } else {
              res.status(403).json({
                msg: "You do not have permission to access this route",
              });
              return; // Ensure the function returns void
            }
          }
        } else {
          res.status(401).json({ msg: "Invalid token payload" });
          return; // Ensure the function returns void
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        res
          .status(401)
          .json({ msg: "Token verification failed, authorization denied" });
        return; // Ensure the function returns void
      }
    } else {
      res.status(401).json({ msg: "No token provided, authorization denied" });
      return; // Ensure the function returns void
    }
  };
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

export default validateUser;

// export { authorizeRoles };
