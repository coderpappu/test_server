import { PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppErrors";

const prisma = new PrismaClient();

// service for get user data
const getUser = async (data: any) => {
  try {
    let userData = data?.user;
    let employeeData = data?.employee;
    if (!userData && !employeeData)
      throw new AppError(404, "User data not found");

    if (userData) {
      return userData;
    } else {
      return employeeData;
    }
  } catch (error) {
    throw error;
  }
};

export default getUser;
