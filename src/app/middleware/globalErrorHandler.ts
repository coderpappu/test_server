import { ErrorRequestHandler } from "express";

import AppError from "../errors/AppErrors";

import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = "Internal Server Error!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
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
    stack: err?.stack,
  });

  return; // Ensure the function returns void
};

export default globalErrorHandler;
