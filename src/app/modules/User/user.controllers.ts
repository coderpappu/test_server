import { NextFunction, Request, Response } from "express";
import sendResponse from "../../../utils/sendResponse";
import { userServices } from "./services/user.services";

// get user
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: any = await userServices.getUser(req);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Account Details",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get user
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: any = await userServices.getUsers();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All Users account",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get user details
const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params?.id;
  try {
    const result: any = await userServices.getUserDetails(userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User account details",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// login user
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: any = await userServices.loginUser(req);

    console.log(req);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Account Login successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// create user account
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: any = await userServices.createUser(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Account create successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// update user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser: any = await userServices.updateUser(req);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Account update successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req?.params?.id;

    const deletedUser: any = await userServices.deleteUser(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Account delete successfully",
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

// update password
const updatePassword = async (
  req: Request & { user?: TUser },
  res: Response,
  next: NextFunction
) => {
  const data: any = req.body as any;
  const userId: string = req.user?.id as string;

  console.log(data);
  try {
    const result: any = await userServices.updatePasswordService(data, userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Password updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createUser,
  getUser,
  loginUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserDetails,
  updatePassword,
};
