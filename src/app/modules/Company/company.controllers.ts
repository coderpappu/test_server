import { NextFunction, Request, Response } from "express";
import { companyServices } from "./services/company.services";

import sendResponse from "../../../utils/sendResponse";
import AppError from "../../errors/AppErrors";
// import httpStatus from "http-status";

// get user
const getCompany = async (
  req: Request & { user?: TUser },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req?.user?.id as string;

    if (!userId) throw new AppError(500, "Invalid User Id");

    const result: any = await companyServices.getAllCompany(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All Company data successfully get",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

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

// get company details
const getCompanyDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req?.params?.id as string;

  try {
    const result: any = await companyServices.getCompanyDetails(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Your Company Details",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// create company
const createCompany = async (
  req: Request & { user?: TUser },
  res: Response,
  next: NextFunction
) => {
  const userId = req?.user?.id as string;
  const data = req.body;

  try {
    const result: any = await companyServices.createCompany(data, userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Company created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// update user

const updateCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedCompany: any = await companyServices.updateCompany(req);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Company profile updated successfully",
      data: updatedCompany,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedCompany: any = await companyServices.deleteCompany(req.params);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Company deleted successfully!",
      data: deletedCompany,
    });
  } catch (error) {
    next(error);
  }
};

export const companyController = {
  createCompany,
  getCompany,
  getCompanyDetails,
  updateCompany,
  deleteCompany,
  companyCheck,
};
