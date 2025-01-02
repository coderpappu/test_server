import { NextFunction, Request, Response } from "express";

// import httpStatus from "http-status";

// get user

const companyCheck = async (
  req: Request & { user?: TUser },
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("Company Check");
  } catch (error) {
    next(error);
  }
};

export const companyController = {
  companyCheck,
};
